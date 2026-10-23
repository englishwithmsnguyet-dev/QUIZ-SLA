const LEGACY_STORAGE_KEY = "sla_quiz_master_state_v1";
const PROFILES_STORAGE_KEY = "sla_quiz_student_profiles_v1";
const ACTIVE_USER_KEY = "sla_quiz_active_mssv_v1";

const state = {
  studentName: "",
  studentId: "",
  lastSavedAt: null,
  viewMode: "single", // 'single' | 'list' | 'cheatsheet'
  currentIndex: 0,
  autoCheckSingle: true,
  showAllAnswersInList: false,
  filterTopic: "ALL",
  filterType: "ALL",
  filterStatus: "ALL", // 'ALL' | 'UNANSWERED' | 'WRONG' | 'BOOKMARKED'
  searchQuery: "",
  shuffledIds: null,
  responses: {}, // { [qId]: { value, checked, isCorrect } }
  bookmarks: {}, // { [qId]: true }
  essayDraft: "",
  essayTimerSeconds: 20 * 60,
  essayTimerRunning: false,
  quizTimerSeconds: 60 * 60,
  quizTimerRunning: false,
  theme: "light"
};

let essayTimerInterval = null;
let quizTimerInterval = null;

function updateGlobalTimerUI() {
  const displayEl = document.getElementById("global-timer-display");
  const pillEl = document.getElementById("global-timer-pill");
  const toggleBtn = document.getElementById("global-timer-toggle-btn");
  if (!displayEl || !pillEl || !toggleBtn) return;

  displayEl.textContent = formatTime(state.quizTimerSeconds);
  toggleBtn.textContent = state.quizTimerRunning ? "⏸ Tạm dừng" : "▶ Bắt đầu";

  pillEl.classList.remove("warning", "danger");
  if (state.quizTimerSeconds <= 5 * 60) {
    pillEl.classList.add("danger");
  } else if (state.quizTimerSeconds <= 10 * 60) {
    pillEl.classList.add("warning");
  }
}

function startGlobalTimer() {
  if (state.quizTimerRunning) return;
  if (state.quizTimerSeconds <= 0) {
    state.quizTimerSeconds = 60 * 60;
  }
  state.quizTimerRunning = true;
  updateGlobalTimerUI();

  clearInterval(quizTimerInterval);
  quizTimerInterval = setInterval(() => {
    if (state.quizTimerSeconds > 0) {
      state.quizTimerSeconds--;
      updateGlobalTimerUI();

      if (state.quizTimerSeconds === 10 * 60) {
        showToast("⚠️ Còn 10 phút nữa là hết 60 phút làm bài!");
      } else if (state.quizTimerSeconds === 5 * 60) {
        showToast("🔥 Còn 5 phút cuối! Hãy kiểm tra lại các câu chưa làm nhé!");
      } else if (state.quizTimerSeconds % 30 === 0) {
        saveState(false);
      }
    } else {
      pauseGlobalTimer();
      saveState(false);
      const answered = Object.values(state.responses).filter((r) => r && r.checked).length;
      const correct = Object.values(state.responses).filter((r) => r && r.checked && r.isCorrect).length;
      alert(
        `⏰ ĐÃ HẾT THỜI GIAN 60 PHÚT!\n\nHọc viên: ${state.studentName || "---"} (MSSV: ${
          state.studentId || "---"
        })\nSố câu đã hoàn thành: ${answered}/40 câu\nSố câu trả lời đúng: ${correct}/${answered} câu\n\nBạn vẫn có thể tiếp tục xem giải thích hoặc làm nốt các câu còn lại!`
      );
    }
  }, 1000);
}

function pauseGlobalTimer() {
  state.quizTimerRunning = false;
  clearInterval(quizTimerInterval);
  updateGlobalTimerUI();
}

function toggleGlobalTimer() {
  if (state.quizTimerRunning) {
    pauseGlobalTimer();
    saveState(false);
  } else {
    startGlobalTimer();
  }
}

function resetGlobalTimer() {
  if (confirm("Đặt lại đồng hồ canh giờ về 60:00 phút?")) {
    pauseGlobalTimer();
    state.quizTimerSeconds = 60 * 60;
    updateGlobalTimerUI();
    saveState(false);
    showToast("⏱ Đã đặt lại đồng hồ về 60:00 phút!");
  }
}

function normalizeMssv(mssv) {
  return String(mssv || "").trim().toUpperCase();
}

function getAllProfiles() {
  try {
    const raw = localStorage.getItem(PROFILES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("Could not read profiles:", e);
    return {};
  }
}

function saveAllProfiles(profiles) {
  try {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
  } catch (e) {
    console.warn("Could not save profiles:", e);
  }
}

function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const item = document.createElement("div");
  item.className = "toast-item";
  item.textContent = message;
  container.appendChild(item);
  setTimeout(() => {
    item.style.opacity = "0";
    item.style.transition = "opacity 0.25s ease";
    setTimeout(() => item.remove(), 260);
  }, 2800);
}

function formatClockTime(isoString) {
  if (!isoString) return "Chưa lưu";
  try {
    const d = new Date(isoString);
    return `Đã lưu ${d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`;
  } catch {
    return "Đã lưu";
  }
}

function updateStudentHeaderUI() {
  const nameEl = document.getElementById("header-student-name");
  const idEl = document.getElementById("header-student-id");
  const savedEl = document.getElementById("last-saved-label");

  if (state.studentId) {
    nameEl.textContent = state.studentName;
    idEl.textContent = `MSSV: ${state.studentId}`;
  } else {
    nameEl.textContent = "Chưa đăng nhập";
    idEl.textContent = "MSSV: ---";
  }

  if (savedEl) {
    savedEl.textContent = formatClockTime(state.lastSavedAt);
  }
}

function loadState() {
  const profiles = getAllProfiles();
  const activeMssv = localStorage.getItem(ACTIVE_USER_KEY);

  if (activeMssv && profiles[activeMssv]) {
    applyProfileToState(profiles[activeMssv]);
  } else {
    // Check legacy storage for any prior anonymous work
    try {
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        const parsed = JSON.parse(legacyRaw);
        state.responses = parsed.responses || {};
        state.bookmarks = parsed.bookmarks || {};
        state.essayDraft = parsed.essayDraft || "";
        state.autoCheckSingle = parsed.autoCheckSingle !== undefined ? parsed.autoCheckSingle : true;
        state.theme = parsed.theme || "light";
      }
    } catch (e) {
      console.warn("Could not load legacy state:", e);
    }
  }

  document.documentElement.setAttribute("data-theme", state.theme);
}

function applyProfileToState(profile) {
  state.studentName = profile.studentName || "";
  state.studentId = profile.studentId || "";
  state.lastSavedAt = profile.lastSavedAt || null;
  state.currentIndex = profile.currentIndex || 0;
  state.responses = profile.responses || {};
  state.bookmarks = profile.bookmarks || {};
  state.essayDraft = profile.essayDraft || "";
  state.quizTimerSeconds =
    typeof profile.quizTimerSeconds === "number" && profile.quizTimerSeconds > 0
      ? profile.quizTimerSeconds
      : 60 * 60;
  state.autoCheckSingle = profile.autoCheckSingle !== undefined ? profile.autoCheckSingle : true;
  state.theme = profile.theme || state.theme || "light";
  document.documentElement.setAttribute("data-theme", state.theme);
}

function saveState(showFeedbackToast = false) {
  const nowIso = new Date().toISOString();
  state.lastSavedAt = nowIso;

  // Save to active student profile if logged in
  if (state.studentId) {
    const key = normalizeMssv(state.studentId);
    const profiles = getAllProfiles();
    profiles[key] = {
      studentName: state.studentName,
      studentId: state.studentId,
      lastSavedAt: nowIso,
      currentIndex: state.currentIndex,
      responses: state.responses,
      bookmarks: state.bookmarks,
      essayDraft: state.essayDraft,
      quizTimerSeconds: state.quizTimerSeconds,
      autoCheckSingle: state.autoCheckSingle,
      theme: state.theme
    };
    saveAllProfiles(profiles);
    localStorage.setItem(ACTIVE_USER_KEY, key);
  }

  // Also keep legacy snapshot synced
  try {
    localStorage.setItem(
      LEGACY_STORAGE_KEY,
      JSON.stringify({
        responses: state.responses,
        bookmarks: state.bookmarks,
        essayDraft: state.essayDraft,
        autoCheckSingle: state.autoCheckSingle,
        theme: state.theme
      })
    );
  } catch (e) {
    console.warn("Could not save state:", e);
  }

  updateStudentHeaderUI();

  if (showFeedbackToast) {
    const answeredCount = Object.values(state.responses).filter((r) => r && r.checked).length;
    if (state.studentId) {
      showToast(
        `💾 Đã lưu tiến độ của ${state.studentName} (${state.studentId}) — Đã làm ${answeredCount}/40 câu!`
      );
    } else {
      showToast(`💾 Đã lưu tiến độ tạm thời (${answeredCount}/40 câu)!`);
    }
  }
}

function openLoginModal(allowClose = false) {
  const modal = document.getElementById("login-modal");
  const closeBtn = document.getElementById("close-login-modal-btn");
  const nameInput = document.getElementById("student-name-input");
  const idInput = document.getElementById("student-id-input");

  if (state.studentName) nameInput.value = state.studentName;
  if (state.studentId) idInput.value = state.studentId;

  closeBtn.style.display = allowClose || state.studentId ? "inline-flex" : "none";

  renderSavedProfilesList();
  modal.style.display = "flex";
  setTimeout(() => nameInput.focus(), 50);
}

function closeLoginModal() {
  document.getElementById("login-modal").style.display = "none";
}

function renderSavedProfilesList() {
  const profiles = getAllProfiles();
  const keys = Object.keys(profiles);
  const section = document.getElementById("saved-profiles-section");
  const listEl = document.getElementById("saved-profiles-list");

  if (keys.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  listEl.innerHTML = "";

  keys.forEach((key) => {
    const p = profiles[key];
    const answered = Object.values(p.responses || {}).filter((r) => r && r.checked).length;
    const correct = Object.values(p.responses || {}).filter((r) => r && r.checked && r.isCorrect).length;

    const item = document.createElement("div");
    item.className = "saved-profile-item";
    item.innerHTML = `
      <div class="saved-profile-meta">
        <strong>🎓 ${p.studentName} (MSSV: ${p.studentId})</strong>
        <span>Đã làm: ${answered}/40 câu • Đúng: ${correct} câu • ${formatClockTime(p.lastSavedAt)}</span>
      </div>
      <span class="btn btn-sm btn-primary">Chọn →</span>
    `;

    item.addEventListener("click", () => {
      loginWithProfile(p.studentName, p.studentId);
    });

    listEl.appendChild(item);
  });
}

function loginWithProfile(name, mssv) {
  const cleanName = String(name || "").trim();
  const cleanId = normalizeMssv(mssv);
  if (!cleanName || !cleanId) return;

  const profiles = getAllProfiles();
  if (profiles[cleanId]) {
    // Existing student profile found -> load their saved progress and update name if edited
    profiles[cleanId].studentName = cleanName;
    saveAllProfiles(profiles);
    applyProfileToState(profiles[cleanId]);
    localStorage.setItem(ACTIVE_USER_KEY, cleanId);
    const answered = Object.values(state.responses).filter((r) => r && r.checked).length;
    showToast(`👋 Chào mừng trở lại, ${cleanName} (${cleanId})! Đã khôi phục ${answered}/40 câu.`);
  } else {
    // New student profile: if currently no student was logged in and there is existing progress, keep it; otherwise start fresh for the new student
    const hadPreviousLoggedInUser = !!state.studentId && state.studentId !== cleanId;
    state.studentName = cleanName;
    state.studentId = cleanId;
    if (hadPreviousLoggedInUser) {
      state.responses = {};
      state.bookmarks = {};
      state.essayDraft = "";
      state.currentIndex = 0;
      state.quizTimerSeconds = 60 * 60;
    }
    saveState(false);
    showToast(`🎉 Đăng nhập thành công: ${cleanName} (MSSV: ${cleanId})`);
  }

  closeLoginModal();
  updateStudentHeaderUI();
  startGlobalTimer();
  renderApp();
}

function exportProgressFile() {
  if (!state.studentId) {
    openLoginModal(true);
    return;
  }
  saveState(false);
  const payload = {
    app: "SLA_MASTER_QUIZ_V1",
    exportedAt: new Date().toISOString(),
    studentName: state.studentName,
    studentId: state.studentId,
    currentIndex: state.currentIndex,
    responses: state.responses,
    bookmarks: state.bookmarks,
    essayDraft: state.essayDraft
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `SLA_Quiz_Progress_${state.studentId}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast(`📥 Đã tải file tiến độ SLA_Quiz_Progress_${state.studentId}.json`);
}

function importProgressFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data || typeof data !== "object" || !data.responses) {
        alert("File không hợp lệ! Vui lòng chọn đúng file .json tiến độ SLA Master Quiz.");
        return;
      }
      state.studentName = data.studentName || state.studentName || "Học viên SLA";
      state.studentId = normalizeMssv(data.studentId || state.studentId || "HV001");
      state.currentIndex = data.currentIndex || 0;
      state.responses = data.responses || {};
      state.bookmarks = data.bookmarks || {};
      state.essayDraft = data.essayDraft || "";
      saveState(false);
      closeLoginModal();
      renderApp();
      const answered = Object.values(state.responses).filter((r) => r && r.checked).length;
      showToast(
        `📤 Đã khôi phục tiến độ của ${state.studentName} (${state.studentId}): ${answered}/40 câu!`
      );
    } catch (err) {
      alert("Không thể đọc file tiến độ. Vui lòng kiểm tra lại định dạng file (.json).");
    }
  };
  reader.readAsText(file);
}

function getTypeLabel(type) {
  switch (type) {
    case "single":
      return "Trắc nghiệm 1 đáp án (Single Choice)";
    case "multi":
      return "Chọn nhiều đáp án (Multiple Response)";
    case "tf":
      return "Đúng / Sai (True / False)";
    case "matching":
      return "Nối cột khái niệm (Matching)";
    case "fill":
      return "Điền thuật ngữ (Fill in the blank)";
    case "essay":
      return "Viết tự luận 150-200 từ (Essay)";
    default:
      return type;
  }
}

function getFilteredQuestions() {
  let list = [...SLA_QUESTIONS];
  if (state.shuffledIds) {
    const map = new Map(list.map((q) => [q.id, q]));
    list = state.shuffledIds.map((id) => map.get(id)).filter(Boolean);
  }

  return list.filter((q) => {
    if (state.filterTopic !== "ALL" && q.topic !== state.filterTopic) return false;
    if (state.filterType !== "ALL" && q.type !== state.filterType) return false;

    const resp = state.responses[q.id];
    if (state.filterStatus === "UNANSWERED" && resp && resp.checked) return false;
    if (state.filterStatus === "WRONG" && (!resp || !resp.checked || resp.isCorrect)) return false;
    if (state.filterStatus === "BOOKMARKED" && !state.bookmarks[q.id]) return false;

    if (state.searchQuery.trim() !== "") {
      const qStr = state.searchQuery.toLowerCase();
      const inPrompt = q.question.toLowerCase().includes(qStr);
      const inOptions = (q.options || []).some((o) => o.text.toLowerCase().includes(qStr));
      const inItems = (q.items || []).some(
        (it) => it.prompt.toLowerCase().includes(qStr) || it.answer.toLowerCase().includes(qStr)
      );
      const inExp =
        (q.explanation?.en || "").toLowerCase().includes(qStr) ||
        (q.explanation?.vi || "").toLowerCase().includes(qStr);
      if (!inPrompt && !inOptions && !inItems && !inExp && String(q.id) !== qStr) {
        return false;
      }
    }
    return true;
  });
}

function evaluateQuestion(q, userVal) {
  if (q.type === "single" || q.type === "tf") {
    return userVal === q.answer;
  }
  if (q.type === "multi") {
    if (!Array.isArray(userVal)) return false;
    const sortedUser = [...userVal].sort().join(",");
    const sortedAns = [...q.answer].sort().join(",");
    return sortedUser === sortedAns;
  }
  if (q.type === "matching") {
    if (!userVal || typeof userVal !== "object") return false;
    return q.items.every((item) => userVal[item.id] === item.answer);
  }
  if (q.type === "fill") {
    if (!userVal || typeof userVal !== "string") return false;
    const clean = userVal.trim().toLowerCase().replace(/\s+/g, " ");
    const accepted = (q.acceptedAnswers || [q.answer]).map((a) => a.toLowerCase().trim());
    return accepted.includes(clean);
  }
  if (q.type === "essay") {
    return true;
  }
  return false;
}

function formatCorrectAnswerDisplay(q) {
  if (q.type === "single" || q.type === "tf") {
    const opt = q.options.find((o) => o.key === q.answer);
    return opt ? `${opt.key}. ${opt.text}` : q.answer;
  }
  if (q.type === "multi") {
    return q.answer
      .map((k) => {
        const opt = q.options.find((o) => o.key === k);
        return opt ? `${opt.key} (${opt.text})` : k;
      })
      .join("; ");
  }
  if (q.type === "matching") {
    return q.items.map((it) => `${it.id} → ${it.answer}`).join(" | ");
  }
  if (q.type === "fill") {
    return q.answer;
  }
  return "Xem bài mẫu & tiêu chí chấm bên dưới";
}

function updateStatsUI() {
  let answered = 0;
  let correct = 0;
  let wrong = 0;
  const bookmarked = Object.values(state.bookmarks).filter(Boolean).length;

  SLA_QUESTIONS.forEach((q) => {
    const r = state.responses[q.id];
    if (r && r.checked) {
      answered++;
      if (r.isCorrect) correct++;
      else wrong++;
    }
  });

  const pct = answered > 0 ? Math.round((correct / answered) * 100) : 0;

  document.getElementById("stat-answered").textContent = `${answered}/40`;
  document.getElementById("stat-correct").textContent = correct;
  document.getElementById("stat-wrong").textContent = wrong;
  document.getElementById("stat-accuracy").textContent = `${pct}%`;
  document.getElementById("stat-bookmarked").textContent = bookmarked;

  const progressFill = document.getElementById("progress-fill");
  if (progressFill) {
    progressFill.style.width = `${(answered / 40) * 100}%`;
  }

  updateStudentHeaderUI();
}

function renderSidebarGrid(filteredQuestions) {
  const grid = document.getElementById("question-grid");
  grid.innerHTML = "";

  const currentQuestion = filteredQuestions[state.currentIndex];

  filteredQuestions.forEach((q, idx) => {
    const btn = document.createElement("button");
    btn.className = "q-grid-btn";
    btn.textContent = q.id;

    if (currentQuestion && currentQuestion.id === q.id && state.viewMode === "single") {
      btn.classList.add("active");
    }

    const r = state.responses[q.id];
    if (r && r.checked) {
      btn.classList.add(r.isCorrect ? "correct" : "wrong");
    }
    if (state.bookmarks[q.id]) {
      btn.classList.add("bookmarked");
    }

    btn.addEventListener("click", () => {
      state.currentIndex = idx;
      saveState(false);
      if (state.viewMode !== "single") {
        const el = document.getElementById(`q-card-${q.id}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      renderApp();
    });

    grid.appendChild(btn);
  });

  document.getElementById("filtered-count-label").textContent = `${filteredQuestions.length} câu`;
}

function buildQuestionCardDOM(q, idxInFiltered, totalFiltered, isListView = false) {
  const card = document.createElement("div");
  card.className = "question-card";
  card.id = `q-card-${q.id}`;

  const resp = state.responses[q.id] || {
    value: q.type === "multi" ? [] : q.type === "matching" ? {} : "",
    checked: false,
    isCorrect: false
  };

  const isChecked = resp.checked || (isListView && state.showAllAnswersInList);
  const isBookmarked = !!state.bookmarks[q.id];

  // Header
  const header = document.createElement("div");
  header.className = "q-card-header";
  header.innerHTML = `
    <div class="q-badges">
      <span class="badge badge-number">Câu ${q.id} / 40</span>
      <span class="badge badge-type">${getTypeLabel(q.type)}</span>
      <span class="badge badge-topic">${SLA_TOPICS[q.topic] || q.topic}</span>
    </div>
    <button class="bookmark-btn ${isBookmarked ? "active" : ""}" data-bookmark="${q.id}" title="Đánh dấu câu hỏi này (Phím B)">
      <span>${isBookmarked ? "★ Đã lưu ôn kỹ" : "☆ Đánh dấu câu khó"}</span>
    </button>
  `;
  header.querySelector("[data-bookmark]").addEventListener("click", () => {
    state.bookmarks[q.id] = !state.bookmarks[q.id];
    saveState(false);
    renderApp();
  });
  card.appendChild(header);

  // Prompt
  const promptEl = document.createElement("div");
  promptEl.className = "q-prompt";
  promptEl.textContent = q.question;
  card.appendChild(promptEl);

  if (q.note) {
    const noteEl = document.createElement("div");
    noteEl.className = "q-note";
    noteEl.textContent = q.note;
    card.appendChild(noteEl);
  }

  // Type-specific instruction hint
  if (q.type === "multi") {
    const hint = document.createElement("div");
    hint.className = "q-instruction-hint";
    hint.textContent = "☑ Câu hỏi chọn NHIỀU đáp án đúng — Hãy tích chọn tất cả các phương án đúng rồi bấm Kiểm tra đáp án.";
    card.appendChild(hint);
  } else if (q.type === "matching") {
    const hint = document.createElement("div");
    hint.className = "q-instruction-hint";
    hint.textContent = "⇄ Chọn khái niệm tương ứng ở cột bên phải cho từng mô tả bên trái rồi bấm Kiểm tra đáp án.";
    card.appendChild(hint);
  }

  // Interactive Body by Question Type
  if (q.type === "single" || q.type === "tf" || q.type === "multi") {
    const listEl = document.createElement("div");
    listEl.className = "options-list";

    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-item";

      const isSelected =
        q.type === "multi"
          ? Array.isArray(resp.value) && resp.value.includes(opt.key)
          : resp.value === opt.key;

      if (isSelected) btn.classList.add("selected");

      if (isChecked) {
        btn.classList.add("locked");
        const isAnswerKey =
          q.type === "multi" ? q.answer.includes(opt.key) : q.answer === opt.key;
        if (isAnswerKey) {
          btn.classList.add("correct-answer");
        } else if (isSelected && !isAnswerKey) {
          btn.classList.add("wrong-answer");
        }
      }

      btn.innerHTML = `
        <span class="option-key">${opt.key}</span>
        <span class="option-text">${opt.text}</span>
      `;

      btn.addEventListener("click", () => {
        if (resp.checked) return;

        if (q.type === "multi") {
          const prev = Array.isArray(resp.value) ? [...resp.value] : [];
          const idx = prev.indexOf(opt.key);
          if (idx >= 0) prev.splice(idx, 1);
          else prev.push(opt.key);
          state.responses[q.id] = { value: prev, checked: false, isCorrect: false };
          saveState(false);
          renderApp();
        } else {
          const shouldAutoCheck = state.autoCheckSingle;
          const isCorrect = evaluateQuestion(q, opt.key);
          state.responses[q.id] = {
            value: opt.key,
            checked: shouldAutoCheck,
            isCorrect: shouldAutoCheck ? isCorrect : false
          };
          saveState(false);
          renderApp();
        }
      });

      listEl.appendChild(btn);
    });

    card.appendChild(listEl);
  } else if (q.type === "matching") {
    const matchContainer = document.createElement("div");
    matchContainer.className = "matching-container";

    const currentMap = resp.value && typeof resp.value === "object" ? { ...resp.value } : {};

    q.items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "matching-row";

      const userChoice = currentMap[item.id] || "";
      if (isChecked) {
        if (userChoice === item.answer) row.classList.add("correct-match");
        else row.classList.add("wrong-match");
      }

      const promptDiv = document.createElement("div");
      promptDiv.className = "matching-prompt";
      promptDiv.textContent = item.prompt;

      const select = document.createElement("select");
      select.className = "matching-select";
      select.disabled = resp.checked;

      const defaultOpt = document.createElement("option");
      defaultOpt.value = "";
      defaultOpt.textContent = "-- Chọn đáp án tương ứng --";
      select.appendChild(defaultOpt);

      q.choices.forEach((choice) => {
        const opt = document.createElement("option");
        opt.value = choice;
        opt.textContent = choice;
        if (userChoice === choice) opt.selected = true;
        select.appendChild(opt);
      });

      select.addEventListener("change", (e) => {
        currentMap[item.id] = e.target.value;
        state.responses[q.id] = {
          value: currentMap,
          checked: false,
          isCorrect: false
        };
        saveState(false);
      });

      row.appendChild(promptDiv);
      row.appendChild(select);

      if (isChecked && userChoice !== item.answer) {
        const corrHint = document.createElement("div");
        corrHint.className = "matching-correct-hint";
        corrHint.textContent = `✓ Đáp án đúng: ${item.answer}`;
        row.appendChild(corrHint);
      }

      matchContainer.appendChild(row);
    });

    card.appendChild(matchContainer);
  } else if (q.type === "fill") {
    const fillBox = document.createElement("div");
    fillBox.className = "fill-container";

    const inputRow = document.createElement("div");
    inputRow.className = "fill-input-row";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "fill-input";
    input.placeholder = "Nhập thuật ngữ tiếng Anh vào đây (nhấn Enter để kiểm tra)...";
    input.value = typeof resp.value === "string" ? resp.value : "";
    input.disabled = resp.checked;

    if (isChecked) {
      input.classList.add(resp.isCorrect ? "correct-fill" : "wrong-fill");
    }

    input.addEventListener("input", (e) => {
      state.responses[q.id] = {
        value: e.target.value,
        checked: false,
        isCorrect: false
      };
      saveState(false);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !resp.checked) {
        e.preventDefault();
        checkQuestionNow(q);
      }
    });

    const hintBtn = document.createElement("button");
    hintBtn.type = "button";
    hintBtn.className = "btn";
    hintBtn.textContent = "💡 Gợi ý chữ cái đầu";
    hintBtn.addEventListener("click", () => {
      const firstWord = q.answer;
      alert(`Gợi ý cho Câu ${q.id}: Bắt đầu bằng chữ "${firstWord.slice(0, 3)}..." (${firstWord.length} ký tự)`);
    });

    inputRow.appendChild(input);
    if (!isChecked) inputRow.appendChild(hintBtn);
    fillBox.appendChild(inputRow);
    card.appendChild(fillBox);
  } else if (q.type === "essay") {
    const essayBox = document.createElement("div");
    essayBox.className = "essay-workspace";

    const countWords = (str) => {
      const trimmed = (str || "").trim();
      return trimmed ? trimmed.split(/\s+/).length : 0;
    };

    const initialWords = countWords(state.essayDraft);
    const inRange = initialWords >= 150 && initialWords <= 200;

    const metaBar = document.createElement("div");
    metaBar.className = "essay-meta-bar";
    metaBar.innerHTML = `
      <div>
        <span>Số từ hiện tại: </span>
        <span id="essay-word-count" class="word-counter ${inRange ? "in-range" : "out-range"}">
          ${initialWords} / 150–200 từ
        </span>
      </div>
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <span>⏱ Đồng hồ 20 phút: <strong id="essay-timer-display">${formatTime(state.essayTimerSeconds)}</strong></span>
        <button type="button" class="btn btn-sm" id="essay-timer-toggle">
          ${state.essayTimerRunning ? "Tạm dừng" : "Bắt đầu bấm giờ"}
        </button>
      </div>
    `;

    const textarea = document.createElement("textarea");
    textarea.className = "essay-textarea";
    textarea.placeholder =
      "Viết đoạn văn 150-200 từ của bạn tại đây (nội dung được tự động lưu theo MSSV)...\nGợi ý mở bài: Instructed Second Language Acquisition (ISLA) plays a vital role in shaping my English teaching by shifting the focus from mechanical rule delivery to facilitating natural language development...";
    textarea.value = state.essayDraft;

    textarea.addEventListener("input", (e) => {
      state.essayDraft = e.target.value;
      saveState(false);
      const wc = countWords(state.essayDraft);
      const wcEl = document.getElementById("essay-word-count");
      if (wcEl) {
        wcEl.textContent = `${wc} / 150–200 từ`;
        wcEl.className = `word-counter ${wc >= 150 && wc <= 200 ? "in-range" : "out-range"}`;
      }
    });

    const rubricBox = document.createElement("div");
    rubricBox.className = "rubric-box";
    rubricBox.innerHTML = `
      <h4>📋 Checklist tiêu chí ăn điểm cho Câu 38:</h4>
      ${q.rubricChecklist
        .map(
          (item) => `
        <div class="rubric-item">
          <span>✔</span>
          <span>${item}</span>
        </div>
      `
        )
        .join("")}
    `;

    essayBox.appendChild(metaBar);
    essayBox.appendChild(textarea);
    essayBox.appendChild(rubricBox);
    card.appendChild(essayBox);

    setTimeout(() => {
      const toggleTimerBtn = document.getElementById("essay-timer-toggle");
      if (toggleTimerBtn) {
        toggleTimerBtn.onclick = () => {
          toggleEssayTimer();
        };
      }
    }, 0);
  }

  // Action bar
  const actionsBar = document.createElement("div");
  actionsBar.className = "q-actions-bar";

  const leftActions = document.createElement("div");
  leftActions.className = "nav-btn-group";

  if (!resp.checked) {
    const checkBtn = document.createElement("button");
    checkBtn.type = "button";
    checkBtn.className = "btn btn-primary";
    checkBtn.textContent =
      q.type === "essay" ? "📖 Xem bài mẫu Band 9 & Hoàn chỉnh bài chụp gốc" : "✓ Kiểm tra đáp án";
    checkBtn.addEventListener("click", () => checkQuestionNow(q));
    leftActions.appendChild(checkBtn);

    if (q.type !== "essay") {
      const revealBtn = document.createElement("button");
      revealBtn.type = "button";
      revealBtn.className = "btn";
      revealBtn.textContent = "👁 Xem giải thích ngay";
      revealBtn.addEventListener("click", () => {
        state.responses[q.id] = {
          value: resp.value,
          checked: true,
          isCorrect: evaluateQuestion(q, resp.value)
        };
        saveState(false);
        renderApp();
      });
      leftActions.appendChild(revealBtn);
    }
  } else {
    const retryBtn = document.createElement("button");
    retryBtn.type = "button";
    retryBtn.className = "btn";
    retryBtn.textContent = "↺ Làm lại câu này";
    retryBtn.addEventListener("click", () => {
      delete state.responses[q.id];
      saveState(false);
      renderApp();
    });
    leftActions.appendChild(retryBtn);
  }

  actionsBar.appendChild(leftActions);

  if (!isListView) {
    const rightNav = document.createElement("div");
    rightNav.className = "nav-btn-group";

    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "btn";
    prevBtn.disabled = idxInFiltered <= 0;
    prevBtn.textContent = "← Câu trước";
    prevBtn.addEventListener("click", () => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        saveState(false);
        renderApp();
      }
    });

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "btn btn-primary";
    nextBtn.disabled = idxInFiltered >= totalFiltered - 1;
    nextBtn.textContent = "Câu tiếp theo →";
    nextBtn.addEventListener("click", () => {
      if (state.currentIndex < totalFiltered - 1) {
        state.currentIndex++;
        saveState(false);
        renderApp();
      }
    });

    rightNav.appendChild(prevBtn);
    rightNav.appendChild(nextBtn);
    actionsBar.appendChild(rightNav);
  }

  card.appendChild(actionsBar);

  // Explanation Section
  if (isChecked) {
    const expBox = document.createElement("div");
    expBox.className = "explanation-box";

    let bannerClass = "neutral";
    let statusTitle = "📖 Đáp án & Giải thích chi tiết";
    if (resp.checked && q.type !== "essay") {
      if (resp.isCorrect) {
        bannerClass = "correct";
        statusTitle = "🎉 Chính xác! Bạn đã nắm vững kiến thức câu này.";
      } else {
        bannerClass = "wrong";
        statusTitle = "💡 Chưa chính xác — Hãy xem kỹ giải thích bên dưới nhé!";
      }
    }

    let essayExtraHTML = "";
    if (q.type === "essay") {
      essayExtraHTML = `
        <div class="exp-section">
          <h4>1. Bài mẫu hoàn chỉnh học thuật (Model Essay - 184 words)</h4>
          <p>${q.modelEssay}</p>
        </div>
        <div class="exp-section">
          <h4>2. Bài làm của học viên trong ảnh chụp gốc (Đã bổ sung phần bị cắt ở cuối)</h4>
          <p>${q.screenshotResponse}</p>
        </div>
      `;
    }

    expBox.innerHTML = `
      <div class="exp-banner ${bannerClass}">
        <span>${statusTitle}</span>
        <span>Đáp án đúng: ${formatCorrectAnswerDisplay(q)}</span>
      </div>
      <div class="exp-body">
        ${
          q.explanation?.tip
            ? `<div class="exp-tip">⚡ <strong>Mẹo nhớ nhanh:</strong> ${q.explanation.tip}</div>`
            : ""
        }
        ${essayExtraHTML}
        <div class="exp-section">
          <h4>🇻🇳 Giải thích Tiếng Việt</h4>
          <p>${q.explanation?.vi || ""}</p>
        </div>
        <div class="exp-section">
          <h4>🇬🇧 Academic Explanation (English)</h4>
          <p>${q.explanation?.en || ""}</p>
        </div>
      </div>
    `;

    card.appendChild(expBox);
  }

  return card;
}

function checkQuestionNow(q) {
  const current = state.responses[q.id]?.value;
  const isCorrect = evaluateQuestion(q, current);
  state.responses[q.id] = {
    value: current,
    checked: true,
    isCorrect
  };
  saveState(false);
  renderApp();
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function toggleEssayTimer() {
  if (state.essayTimerRunning) {
    clearInterval(essayTimerInterval);
    state.essayTimerRunning = false;
  } else {
    state.essayTimerRunning = true;
    essayTimerInterval = setInterval(() => {
      if (state.essayTimerSeconds > 0) {
        state.essayTimerSeconds--;
        const el = document.getElementById("essay-timer-display");
        if (el) el.textContent = formatTime(state.essayTimerSeconds);
      } else {
        clearInterval(essayTimerInterval);
        state.essayTimerRunning = false;
        alert("⏰ Đã hết 20 phút làm bài tự luận Câu 38!");
      }
    }, 1000);
  }
  renderApp();
}

function renderCheatSheet(container) {
  container.innerHTML = `
    <div class="question-card">
      <h2 style="margin-bottom:0.4rem;">📚 Bảng Tóm Tắt Lý Thuyết Trọng Tâm SLA (Questions 1–40)</h2>
      <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:1.25rem;">
        Tổng hợp toàn bộ các học giả, giả thuyết và cặp khái niệm xuất hiện trong đề cương 40 câu SLA giúp bạn ôn nhanh trước giờ thi.
      </p>
      <div class="cheat-sheet-grid">
        <div class="theory-card">
          <h3>1. Nền tảng SLA & ISLA (C2, 9, 10, 13, 17, 18, 24, 31)</h3>
          <ul>
            <li><strong>Interlanguage (Selinker, 1972):</strong> Hệ thống ngôn ngữ của người học có tính hệ thống (<em>systematic</em>) và biến đổi linh hoạt, KHÔNG phải ngẫu nhiên (<em>not random</em>).</li>
            <li><strong>Định nghĩa ISLA (Loewen, 2020, p.3):</strong> Tác động có hệ thống lên <em>mechanisms of learning</em> và <em><strong>conditions</strong> under which they occur</em>.</li>
            <li><strong>4 nền tảng lý thuyết ISLA:</strong> Skill Acquisition, Interaction Theory, Input Processing, Sociocultural Theory (Không gồm Universal Grammar).</li>
            <li><strong>Lộ trình tự nhiên:</strong> Người học L2 đi theo <em>similar natural developmental route/sequence</em>.</li>
          </ul>
        </div>

        <div class="theory-card">
          <h3>2. Tri thức Ẩn/Hiện & Noticing (C6, 34, 39, 40)</h3>
          <ul>
            <li><strong>Implicit Knowledge (Tri thức ẩn):</strong> Học ngẫu nhiên (<em>incidentally acquired</em>), dùng cho giao tiếp tự nhiên tức thời (<em>spontaneous communication</em>).</li>
            <li><strong>Explicit Knowledge (Tri thức hiện):</strong> Ý thức quy tắc (<em>metalinguistic awareness</em>), dùng để giám sát lỗi (<em>monitoring language performance</em>).</li>
            <li><strong>Noticing Hypothesis (Schmidt):</strong> Cần có <em>conscious awareness of linguistic forms</em> để biến input thành intake.</li>
            <li><strong>Focus on Form vs. FormS (Long):</strong> <em>Focus on form</em> lồng ghép chú ý hình thức ngôn ngữ ngay TRONG giao tiếp có ý nghĩa (<em>within meaning-focused interaction</em>).</li>
            <li><strong>Input Enhancement:</strong> Tô đậm/nhấn mạnh hình thức ngôn ngữ trong input để tăng <em>noticing</em>.</li>
          </ul>
        </div>

        <div class="theory-card">
          <h3>3. Tương tác, Đầu ra & Phản hồi (C3, 5, 16, 20, 22, 23, 30)</h3>
          <ul>
            <li><strong>Long's Interaction Hypothesis:</strong> Trung tâm là <em>Negotiation for meaning during communication breakdowns</em>, giúp phát triển <em>implicit knowledge</em>.</li>
            <li><strong>Task tối ưu nhất:</strong> <em>Two-way information gap with convergent goals</em>.</li>
            <li><strong>Swain's Output Hypothesis:</strong> Đầu ra giúp người học xử lý hình thái - cú pháp (<em>process morphosyntactic elements</em>) và kiểm nghiệm giả thuyết (<em>test hypotheses</em>).</li>
            <li><strong>Recasts:</strong> Phản hồi cung cấp sẵn dạng đúng (<em>input-providing</em>) và ngầm ẩn (<em>typically implicit</em>).</li>
            <li><strong>Elicitation (Output-prompting):</strong> Thúc đẩy người học tự sửa, giúp xử lý nhận thức sâu hơn (<em>deeper cognitive processing</em>).</li>
          </ul>
        </div>

        <div class="theory-card">
          <h3>4. Lý thuyết Văn hóa - Xã hội / Vygotsky (C15, 21, 27, 28, 33, 35)</h3>
          <ul>
            <li><strong>ZPD (Zone of Proximal Development):</strong> Khoảng cách giữa những gì tự làm độc lập (<em>independently</em>) và làm được khi có hỗ trợ (<em>with support</em>).</li>
            <li><strong>Scaffolding:</strong> Sự hỗ trợ giúp người học vượt ngưỡng năng lực hiện tại.</li>
            <li><strong>Internalization (Nội tâm hóa):</strong> Chuyển hóa tương tác xã hội bên ngoài thành chức năng nhận thức bên trong (<em>social interactions → internal cognitive processes</em>).</li>
            <li><strong>Mediation (Trung gian hóa):</strong> Sử dụng công cụ (ngôn ngữ, bạn học, công nghệ) để hỗ trợ việc học.</li>
          </ul>
        </div>

        <div class="theory-card">
          <h3>5. Ngữ pháp & Phát âm (C7, 14, 19, 25, 26, 36)</h3>
          <ul>
            <li><strong>Teachability Hypothesis (Pienemann):</strong> Phụ thuộc vào độ sẵn sàng phát triển của người học (<em>developmental readiness</em>).</li>
            <li><strong>Prescriptive vs. Descriptive Grammar:</strong> Prescriptive quy định cách PHẢI dùng (<em>dictates how language should be used</em>); Descriptive phản ánh thực tế sử dụng (<em>reflects actual usage</em>).</li>
            <li><strong>5 Phương pháp dạy (C25):</strong> PPP (giải thích quy tắc → luyện tập), Processing instruction (hiểu & xử lý input), Dictogloss (tái tạo văn bản), Explicit instruction (chú ý trực tiếp), Consciousness-raising (quy nạp tìm quy tắc).</li>
            <li><strong>Mục tiêu dạy phát âm:</strong> Hướng tới sự dễ hiểu (<em>Intelligibility</em>) thay vì đòi hỏi giọng bản xứ tuyệt đối.</li>
          </ul>
        </div>

        <div class="theory-card">
          <h3>6. Ngữ dụng học & Khác biệt Cá nhân (C1, 4, 8, 11, 12, 29, 32, 37)</h3>
          <ul>
            <li><strong>Pragmatics:</strong> Gồm <em>Pragmalinguistics</em> + <em>Sociopragmatics</em> (Không gồm <em>gender equity</em>). Đánh giá bằng <strong>Discourse Completion Tasks (DCTs)</strong>. Dạy hiệu quả bằng <em>Explicit teaching of speech acts</em> + tiếp xúc <em>authentic language use</em>.</li>
            <li><strong>Stable Traits (Cố định, giáo viên khó thay đổi):</strong> Working memory, Language learning aptitude, Learning styles.</li>
            <li><strong>Dynamic Factors (Biến thiên, giáo viên tác động được):</strong> Motivation, Willingness to communicate (WTC), Emotions, Learning strategies.</li>
            <li><strong>3 Mô hình Động lực (C37):</strong> Socioeducational (Integrative/Instrumental) | Process-oriented (Dynamic over time) | L2 Motivational Self-System (Self-image & Identity).</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

function renderApp() {
  updateStatsUI();

  const filtered = getFilteredQuestions();
  if (state.currentIndex >= filtered.length) {
    state.currentIndex = Math.max(0, filtered.length - 1);
  }

  renderSidebarGrid(filtered);

  const container = document.getElementById("questions-mount");
  container.innerHTML = "";

  if (state.viewMode === "cheatsheet") {
    renderCheatSheet(container);
    return;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="question-card" style="text-align:center; padding: 3rem 1.5rem;">
        <h3 style="margin-bottom:0.5rem;">Không tìm thấy câu hỏi nào khớp với bộ lọc hiện tại</h3>
        <p style="color:var(--text-secondary); margin-bottom:1.2rem;">Hãy thử chuyển bộ lọc trạng thái về "Tất cả (40)" hoặc xóa từ khóa tìm kiếm.</p>
        <button class="btn btn-primary" id="reset-filters-btn">Hiển thị lại toàn bộ 40 câu</button>
      </div>
    `;
    document.getElementById("reset-filters-btn")?.addEventListener("click", () => {
      state.filterTopic = "ALL";
      state.filterType = "ALL";
      state.filterStatus = "ALL";
      state.searchQuery = "";
      document.getElementById("topic-filter").value = "ALL";
      document.getElementById("type-filter").value = "ALL";
      document.getElementById("search-input").value = "";
      updateStatusPillsUI();
      renderApp();
    });
    return;
  }

  if (state.viewMode === "single") {
    const q = filtered[state.currentIndex];
    const cardDOM = buildQuestionCardDOM(q, state.currentIndex, filtered.length, false);
    container.appendChild(cardDOM);
  } else if (state.viewMode === "list") {
    filtered.forEach((q, idx) => {
      const cardDOM = buildQuestionCardDOM(q, idx, filtered.length, true);
      cardDOM.style.marginBottom = "1.2rem";
      container.appendChild(cardDOM);
    });
  }
}

function updateStatusPillsUI() {
  document.querySelectorAll("[data-status-filter]").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-status-filter") === state.filterStatus);
  });
}

function initEvents() {
  // Login Form Submit
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const nameVal = document.getElementById("student-name-input").value.trim();
    const idVal = document.getElementById("student-id-input").value.trim();
    if (!nameVal || !idVal) {
      alert("Vui lòng nhập đầy đủ Họ Tên và MSSV!");
      return;
    }
    loginWithProfile(nameVal, idVal);
  });

  // Switch User / Open Login Modal
  document.getElementById("switch-user-btn").addEventListener("click", () => {
    openLoginModal(true);
  });

  document.getElementById("close-login-modal-btn").addEventListener("click", () => {
    closeLoginModal();
  });

  // Save Progress Buttons (Header & Sidebar)
  const handleManualSave = () => {
    if (!state.studentId) {
      openLoginModal(true);
      return;
    }
    saveState(true);
  };
  document.getElementById("save-progress-btn").addEventListener("click", handleManualSave);
  document.getElementById("sidebar-save-btn").addEventListener("click", handleManualSave);

  // Export & Import Progress JSON
  document.getElementById("export-progress-btn").addEventListener("click", exportProgressFile);
  document.getElementById("import-progress-input").addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (file) {
      importProgressFile(file);
      e.target.value = "";
    }
  });

  // Topic Filter
  const topicSelect = document.getElementById("topic-filter");
  Object.entries(SLA_TOPICS).forEach(([key, label]) => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = label;
    topicSelect.appendChild(opt);
  });
  topicSelect.addEventListener("change", (e) => {
    state.filterTopic = e.target.value;
    state.currentIndex = 0;
    renderApp();
  });

  // Type Filter
  document.getElementById("type-filter").addEventListener("change", (e) => {
    state.filterType = e.target.value;
    state.currentIndex = 0;
    renderApp();
  });

  // Search Input
  document.getElementById("search-input").addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    state.currentIndex = 0;
    renderApp();
  });

  // Status Filter Pills
  document.querySelectorAll("[data-status-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.filterStatus = btn.getAttribute("data-status-filter");
      state.currentIndex = 0;
      updateStatusPillsUI();
      renderApp();
    });
  });

  // View Mode Tabs
  document.querySelectorAll("[data-view-mode]").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.viewMode = tab.getAttribute("data-view-mode");
      document.querySelectorAll("[data-view-mode]").forEach((t) => {
        t.classList.toggle("active", t.getAttribute("data-view-mode") === state.viewMode);
      });
      const listRevealWrap = document.getElementById("list-reveal-wrapper");
      if (listRevealWrap) {
        listRevealWrap.style.display = state.viewMode === "list" ? "inline-flex" : "none";
      }
      renderApp();
    });
  });

  // Auto-check toggle
  const autoCheckInput = document.getElementById("auto-check-toggle");
  autoCheckInput.checked = state.autoCheckSingle;
  autoCheckInput.addEventListener("change", (e) => {
    state.autoCheckSingle = e.target.checked;
    saveState(false);
  });

  // Show all answers in List mode toggle
  const showAllListInput = document.getElementById("show-all-list-toggle");
  showAllListInput.addEventListener("change", (e) => {
    state.showAllAnswersInList = e.target.checked;
    renderApp();
  });

  // Shuffle button
  document.getElementById("shuffle-btn").addEventListener("click", () => {
    if (state.shuffledIds) {
      state.shuffledIds = null;
      document.getElementById("shuffle-btn").textContent = "🔀 Trộn thứ tự câu";
    } else {
      const ids = SLA_QUESTIONS.map((q) => q.id);
      for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
      }
      state.shuffledIds = ids;
      document.getElementById("shuffle-btn").textContent = "🔢 Về thứ tự gốc 1–40";
    }
    state.currentIndex = 0;
    renderApp();
  });

  // Retry Wrong Answers Quick Button
  document.getElementById("retry-wrong-btn").addEventListener("click", () => {
    const wrongIds = SLA_QUESTIONS.filter(
      (q) => state.responses[q.id]?.checked && !state.responses[q.id]?.isCorrect
    ).map((q) => q.id);

    if (wrongIds.length === 0) {
      alert("Bạn hiện không có câu trả lời sai nào!");
      return;
    }

    wrongIds.forEach((id) => {
      delete state.responses[id];
    });
    saveState(true);
    state.filterStatus = "UNANSWERED";
    updateStatusPillsUI();
    state.currentIndex = 0;
    renderApp();
  });

  // Reset All Progress
  document.getElementById("reset-all-btn").addEventListener("click", () => {
    if (
      confirm(
        `Bạn có chắc muốn xóa kết quả đã làm của ${
          state.studentName || "học viên hiện tại"
        } để luyện tập lại từ đầu không? (Các câu đã đánh dấu ★ và bài nháp tự luận vẫn được giữ nguyên)`
      )
    ) {
      state.responses = {};
      state.currentIndex = 0;
      saveState(true);
      renderApp();
    }
  });

  // Theme Toggle
  const themeBtn = document.getElementById("theme-toggle-btn");
  const updateThemeBtnText = () => {
    themeBtn.textContent = state.theme === "dark" ? "☀️ Giao diện Sáng" : "🌙 Giao diện Tối";
  };
  updateThemeBtnText();
  themeBtn.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    updateThemeBtnText();
    saveState(false);
  });

  // Keyboard shortcuts
  window.addEventListener("keydown", (e) => {
    // Ctrl+S / Cmd+S to Save Progress
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      handleManualSave();
      return;
    }

    // Do not intercept keys when login modal is open
    const modal = document.getElementById("login-modal");
    if (modal && modal.style.display !== "none") return;

    const activeTag = document.activeElement?.tagName;
    if (activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT") return;
    if (state.viewMode !== "single") return;

    const filtered = getFilteredQuestions();
    if (!filtered.length) return;
    const q = filtered[state.currentIndex];

    if (e.key === "ArrowRight") {
      if (state.currentIndex < filtered.length - 1) {
        state.currentIndex++;
        saveState(false);
        renderApp();
      }
    } else if (e.key === "ArrowLeft") {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        saveState(false);
        renderApp();
      }
    } else if (e.key.toLowerCase() === "b") {
      state.bookmarks[q.id] = !state.bookmarks[q.id];
      saveState(false);
      renderApp();
    } else if (e.key === "Enter") {
      if (!state.responses[q.id]?.checked) {
        checkQuestionNow(q);
      }
    } else if (["a", "b", "c", "d", "e", "1", "2", "3", "4", "5"].includes(e.key.toLowerCase())) {
      if (state.responses[q.id]?.checked) return;
      if (q.type === "single" || q.type === "tf" || q.type === "multi") {
        const keyMap = { "1": "A", "2": "B", "3": "C", "4": "D", "5": "E" };
        const letter = keyMap[e.key] || e.key.toUpperCase();
        const found = (q.options || []).find((o) => o.key === letter);
        if (found) {
          if (q.type === "multi") {
            const prev = Array.isArray(state.responses[q.id]?.value)
              ? [...state.responses[q.id].value]
              : [];
            const idx = prev.indexOf(letter);
            if (idx >= 0) prev.splice(idx, 1);
            else prev.push(letter);
            state.responses[q.id] = { value: prev, checked: false, isCorrect: false };
          } else {
            const isCorrect = evaluateQuestion(q, letter);
            state.responses[q.id] = {
              value: letter,
              checked: state.autoCheckSingle,
              isCorrect: state.autoCheckSingle ? isCorrect : false
            };
          }
          saveState(false);
          renderApp();
        }
      }
    }
  });

  // 60-Minute Global Timer Controls
  document.getElementById("global-timer-toggle-btn").addEventListener("click", toggleGlobalTimer);
  document.getElementById("global-timer-reset-btn").addEventListener("click", resetGlobalTimer);
}

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  initEvents();
  updateGlobalTimerUI();
  renderApp();

  // Prompt login modal if student hasn't logged in yet, otherwise start 60-min timer
  if (!state.studentId) {
    openLoginModal(false);
  } else {
    startGlobalTimer();
  }
});
