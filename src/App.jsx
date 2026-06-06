// ═══════════════════════════════════════════════════════════════════════════════
// Novel Flow Artist V31-2
// ───────────────────────────────────────────────────────────────────────────────
// CHANGES FROM V31-1:
//
// 🔊 TTS (Text-to-Speech) — แก้ครบทุกปัญหา
//
//   🐛 Chrome bug fix — เสียงหยุดกลางคัน
//     • keepAlive interval ทุก 10 วิ: pause()+resume() ปลุก Chrome ให้อ่านต่อ
//     • หยุดเมื่อ pause/stop/เปลี่ยนบท
//
//   📖 อ่านทีละประโยค (sentence-by-sentence)
//     • แบ่ง text ด้วย _splitSentences() → .!?\n
//     • onend ของแต่ละประโยค → _ttsSpeakSentence(idx+1)
//     • จบบท → auto-advance ไปบทถัดไป + เปลี่ยน activeChId ใน editor
//
//   ✨ Highlight ประโยคที่กำลังอ่าน
//     • ttsHighlight state → แสดงใน TTS panel ขณะอ่าน
//
//   🎛 TTS Panel อัปเกรด
//     • แสดงประโยคที่กำลังอ่าน (preview box)
//     • ปุ่ม ⏮ ⏸/▶ ⏹ ⏭ (prev chapter / pause / stop / next chapter)
//     • Voice picker แยก Thai/EN/อื่นๆ + warning ถ้าไม่มีเสียงไทย
//     • Speed slider มี label 0.5–2.0×
//
// ═══════════════════════════════════════════════════════════════════════════════
// Novel Flow Artist V31-1
//
// 💾 Save As — บันทึกด้วยชื่อและฟอร์แมตที่เลือก
//   • Dialog: ตั้งชื่อไฟล์ + เลือก 6 ฟอร์แมต
//     - .novelforge (โปรเจกต์เต็ม import กลับได้)
//     - Markdown .md (ทุกบทรวมไฟล์เดียว)
//     - Plain Text .txt (ข้อความล้วน)
//     - HTML .html (หนังสือพร้อม CSS)
//     - PDF (ผ่าน browser print)
//     - EPUB (e-book)
//   • เปิดจากเมนู "ไฟล์ → 💾 Save As…"
//   • Enter ใน filename field = บันทึกทันที
//
// ═══════════════════════════════════════════════════════════════════════════════
// Novel Flow Artist V31
//
// ⌨️ Typewriter Mode (ปุ่ม "⌨ TW" ใน toolbar)
//   • scroll บรรทัดที่กำลังพิมพ์ให้อยู่กลางจอโดยอัตโนมัติ
//   • ใช้ Quill getBounds() + smooth scroll
//   • Toggle ได้จากปุ่มใน toolbar
//
// ¶ Paragraph Focus Mode (ปุ่ม "¶ Focus" ใน toolbar)
//   • dim ย่อหน้าที่ไม่ได้พิมพ์ (opacity 0.18)
//   • ย่อหน้าที่ cursor อยู่ → สว่างเต็ม (class para-focused)
//   • Toggle ได้จากปุ่มใน toolbar
//
// 👆 Swipe เปลี่ยนบท (touch gesture)
//   • swipe ซ้าย → บทถัดไป / swipe ขวา → บทก่อนหน้า
//   • ต้องมี dx ≥ 60px และ horizontal มากกว่า vertical × 2
//   • อ่าน state ผ่าน refs ป้องกัน stale closure
//
// 🖱 Cursor to top + Scroll to top + Collapse panels เมื่อกด editor
//   • onMouseDown ของ scroll container: scrollTop = 0 + ซ่อน rightPanel + ซ่อน chList
//
// ═══════════════════════════════════════════════════════════════════════════════
// Novel Flow Artist V30-2-1
// ───────────────────────────────────────────────────────────────────────────────
// CHANGES FROM V26:
//
// 🎯 Writing Goal — Per-project daily word goal (ตั้งเป้าคำ/วันได้แต่ละโปรเจกต์)
//   • ย้าย Writing Goal เข้า RightPanel tab "stats" (เดิมมีแล้ว แต่ทำงานไม่ครบ)
//   • เพิ่ม goalToday: คำที่พิมพ์ในเซสชันปัจจุบัน (session words)
//   • Progress bar แสดง % ของ goal ใต้ editor พร้อม animation
//   • เมื่อถึง goal → แสดง toast + confetti effect เล็กน้อย
//
// 📊 Progress Bar — Visual writing progress (ใต้ editor + ใน stats panel)
//   • Session progress bar (คำวันนี้ vs goal)
//   • Total project progress bar (คำทั้งหมด vs target เช่น 80,000 คำ)
//   • Per-chapter progress bars ใน Stats tab
//   • แสดง % และ estimated days to finish
//
// 🔥 Writing Streak — Daily writing streak tracker
//   • เก็บ streak ใน localStorage (nfa_streak_*)
//   • นับวันต่อเนื่องที่พิมพ์ถึง goal (≥1 คำก็นับ ถ้าไม่ตั้ง goal)
//   • แสดง streak badge 🔥 N วัน ใน status bar + stats panel
//   • Freeze day: ถ้าพิมพ์แต่ไม่ถึง goal streak จะ freeze ไม่ขาด (grace mode)
//
// 📈 Story Dashboard — Project overview panel (tab ใหม่ "📈 Dashboard")
//   • Summary card: คำทั้งหมด / บท / ตัวละคร / เวลาอ่าน / streak
//   • Writing velocity chart: bar chart คำ/บท (svg inline)
//   • Completion ring: donut chart แสดง % ความคืบหน้าถึง target
//   • Recent activity: บทที่แก้ล่าสุด + wordcount
//   • Goal tracker: session goal + project target
//
// 👥 Character Mention Breakdown — ตัวละครปรากฏในบทไหนบ้าง (ละเอียดขึ้น)
//   • ใน CharactersPanel: แทนที่ badge ชื่อบทธรรมดา → ตารางแสดง mentions/บท
//   • แสดง bar mini-chart ข้างชื่อบท (กว้างตามจำนวน mention)
//   • แสดง top-3 บทที่ mention เยอะสุด + % ของ mention ทั้งหมด
//   • คลิก badge บทใด → jump ไปบทนั้นใน editor
//
// ═══════════════════════════════════════════════════════════════════════════════
// Novel Flow Artist V26
// ───────────────────────────────────────────────────────────────────────────────
// CHANGES FROM V25:
//
// 🐛 Bug Fix — Series Stale Closure (ซิ้งไม่ถูก)
//   • updateSeries: เปลี่ยนจาก series.find() (stale state) → dbGet() จาก IndexedDB
//   • addProjectToSeries: อ่าน project และ series จาก DB โดยตรงแทน closure
//   • removeProjectFromSeries: อ่านจาก DB แทน state
//   • updateSeriesBible: เปลี่ยนเป็น async + dbGet() ปลอดภัยจาก stale closure
//   → แก้อาการ: Series สร้างใหม่ไม่โชว์ใน Home
//   → แก้อาการ: โปรเจกต์ที่เพิ่มเข้า Series ไม่อัปเดต bookIds
//
// ═══════════════════════════════════════════════════════════════════════════════
// Novel Flow Artist V25
// ───────────────────────────────────────────────────────────────────────────────
// CHANGES FROM V24-3:
//
// 📚 Series Management (S Tier)
//   • Series data model: id, title, desc, coverColor, bookIds[], seriesBible{}
//   • Store "series" ใน IndexedDB (DB_VERSION → 2 + migration)
//   • Home screen: Series Project card แสดง badge 📚 Series + sub-books
//   • สร้าง/แก้ไข/ลบ Series ได้จาก Home
//   • Editor: tab "🌐 Series" เมื่อ book อยู่ใน series (workMode write)
//   • Series tab มี 4 sub-tab: Bible · Consistency · Arcs · Plots
//     - Bible: World rules, Magic/Tech system, Canon facts ข้ามเล่ม
//     - Consistency: Cross-book timeline, Character age tracker
//     - Arcs: Story arc manager ข้ามเล่ม (arc title, books, status)
//     - Plots: Plot thread tracker (open/resolved, linked chapters)
//
// ═══════════════════════════════════════════════════════════════════════════════
// Novel Flow Artist V24-3
// ───────────────────────────────────────────────────────────────────────────────
// CHANGES FROM V24-2:
//
// 🐛 Bug Fix — HTML Content Rendering
//   • Preview thumbnail (บทที่ X): stripHtml() ก่อน substring(0,300) — ไม่แสดง <p></p> ดิบ
//   • Preview detail panel: wordCount ใช้ stripHtml().length แทน content.length ดิบ
//   • Reading Mode: ใช้ dangerouslySetInnerHTML แทน {activeCh.content} — แสดง HTML ถูกต้อง
//   • Focus Mode mic interim overlay: stripHtml() ก่อนแสดง ghost text
//   • EPUB export: content เป็น HTML แล้ว — ใช้ตรงๆ แทน split("\n\n") + wrap <p>
//     (ยัง fallback แปลง plain text เป็น <p> ถ้าไม่มี HTML tags)
//   • AI prompts (synopsis/consistency/continue): stripHtml() ก่อนส่ง content ให้ AI
//   • ParagraphControls typography check: stripHtml() ก่อน countTypographyIssues
//   • TTS speak: stripHtml() ก่อนส่งให้ SpeechSynthesis
//   • Character panel countMentions: stripHtml() ก่อน split(name) — นับถูก ไม่นับ tag
//   • Character panel "ปรากฏในบท": stripHtml() ก่อน includes(name) — filter ถูกต้อง
//
// ═══════════════════════════════════════════════════════════════════════════════
// Novel Flow Artist V24-2
// ───────────────────────────────────────────────────────────────────────────────
// CHANGES FROM V24-1:
//
// 🔤 DOCX Import — Named Chapter Detection
//   • ขยาย regex ใน looksLikeChapterHead ให้จับบท/ตอนที่ไม่มีเลข:
//       ไทย: บทนำ / ปฐมบท / บทส่งท้าย / บทอวสาน / บทพิเศษ / ตอนพิเศษ / ตอนนำ / ตอนท้าย
//       อังกฤษ: Prologue / Epilogue / Interlude / Afterword / Foreword /
//               Introduction / Conclusion / Side Story / Bonus Chapter / Extra Episode
//   • เงื่อนไข: ข้อความต้องยาวไม่เกิน 60 ตัวอักษร (ป้องกัน false positive)
//   • ใช้ \b word-boundary + /i flag — จับทั้งตัวพิมพ์ใหญ่/เล็ก
//   • logic flush / set title เดิมไม่เปลี่ยน — safe backward-compatible
//
// ═══════════════════════════════════════════════════════════════════════════════
// Novel Flow Artist V24-1 (= V24)
// ───────────────────────────────────────────────────────────────────────────────
// CHANGES FROM V23:
//
// 🐛 Bug Fix — Keyboard Shortcut bypass input/textarea
//   • เพิ่ม input/textarea/contentEditable guard ใน onKeyDown handler
//   • ESC และ Ctrl+S ยังทำงานได้ทุกที่ตามเดิม
//
// ⚡ Render Optimize — Image useMemo
//   • activeChImages / behindImages / inlineImages เป็น useMemo
//   • recompute เฉพาะเมื่อ images หรือ activeChId เปลี่ยน
//
// 🗂 Writing / Book Design Mode Toggle
//   • แยก tab เป็น 2 mode: Writing (✍️) และ Book Design (📖)
//   • Mode toggle อยู่กลาง menubar — เห็นชัด สลับด้วยคลิกเดียว
//   • Tab bar แยกแถวใต้ menubar — ไม่ล้นหน้าจอ
//   • Writing: เขียน · Preview · Structure · ตัวละคร · Scenes · Timeline · World · Mind Map · AI
//   • Book Design: ปก · Structure · Assets · Preview
//   • switchWorkMode() auto-jump ไป tab ที่เหมาะสมเมื่อสลับ mode
//
// ═══════════════════════════════════════════════════════════════════════════════
// Novel Flow Artist V23
// ───────────────────────────────────────────────────────────────────────────────
// CHANGES FROM V22:
//
// 🐛 Bug Fix
//   • แก้ไข "Cannot access 'frBarVisible' before initialization"
//     — ย้าย useState ของ frBarVisible / frQuery / frReplace / frCount / frQueryRef
//       ขึ้นมาก่อน useEffect keyboard shortcut ที่อ้างอิงตัวแปรเหล่านั้น
//
// ═══════════════════════════════════════════════════════════════════════════════
// CHANGES FROM V21:
//
// 🗺 Mind Map (tab ใหม่ "🗺 Mind Map")
//   • Node-based editor — drag, connect, label edge ได้
//   • Add node จาก Characters / บท / Custom
//   • Double-click node เพื่อแก้ชื่อ inline
//   • ลาก node ได้อิสระ, เส้นเชื่อมตามไปอัตโนมัติ
//   • เลือก 2 node แล้วกด "เชื่อม" — หรือ drag จาก port
//   • ลบ node / edge ด้วยปุ่ม Delete หรือ × บน edge
//   • บันทึกใน mindMap state (export พร้อม project)
//
// 🌍 World Map (tab ใหม่ "🌐 Map" ใน World Bible)
//   • Canvas วาดแผนที่ — pan (drag พื้นหลัง) + zoom (scroll)
//   • Pin สถานที่จาก World Bible locations อัตโนมัติ
//   • คลิกวาง pin ใหม่ / ลาก pin ย้ายตำแหน่ง
//   • คลิก pin → popup แสดงชื่อ + desc + ปุ่มลบ
//   • บันทึก pin positions ใน world.mapPins
//
// ⚡ .map() Optimize (c)
//   • Split pane: แยก render main/split pane ออกจาก .map() — textarea stable ไม่ re-mount
//   • Image filter: รวม getImagesForChapter เรียกครั้งเดียว แยก behind/inline ด้วย filter
//
// ═══════════════════════════════════════════════════════════════════════════════
// CHANGES FROM V20:
//
// ⌨️ Keyboard Shortcuts (Global)
//   • Ctrl+F  — เปิด Find bar (ใต้ toolbar, โฟกัส search input ทันที)
//   • Ctrl+H  — เปิด Find & Replace bar (พร้อม replace field)
//   • Ctrl+S  — บันทึกโปรเจกต์ทันที (manual save + toast)
//   • Ctrl+`  — สลับ Reading Mode (Ctrl+Backtick)
//   • Ctrl+Enter — เข้า/ออก Focus Mode (fullscreen write)
//   • ESC    — ปิด Find bar → ออก Reading Mode → deselect image (ตามลำดับ)
//
// 🔍 Inline Find & Replace Bar
//   • แสดงใต้ toolbar ของ Editor — ไม่บัง content เป็น modal
//   • Enter ใน search field = นับ · Enter ใน replace field = แทนที่ทั้งหมด
//   • แสดง badge "X รายการ" / "ไม่พบ" ทันที
//   • ปุ่ม × หรือ ESC ปิด bar และ reset count
//
// 📖 Reading Mode (Ctrl+`)
//   • มุมมองอ่านสะอาด — ซ่อน toolbar / panel ทั้งหมด
//   • แสดงเนื้อหา formatted เต็มจอ ไม่มี textarea focus
//   • nav บท ← / → ที่ top bar
//   • ESC หรือปุ่ม "← ออก Reading Mode" กลับ Editor ปกติ
//   • รองรับ theme (dark / sepia / white) โดยอัตโนมัติ
//
// ═══════════════════════════════════════════════════════════════════════════════
// CHANGES FROM V19:
//
// 🎨 Quick Style Panel (floating draggable — ขวามือ)
//   • ปุ่ม "🎨 Quick" ใน left nav tool panel — เปิด/ปิด panel ลอยขวามือได้เลย
//   • Draggable — ลากไปวางได้ทุกตำแหน่งบนหน้าจอ
//   • ควบคุม 5 อย่างทันที: ขนาดฟอนต์ / Margin H / Margin V / Line Height / สี 5 slot
//   • จาน 15 สี quick-pick + native color picker + hex input inline
//   • Slot selector: เนื้อหา / หัวบท / Accent / พื้นหลัง / Divider
//   • ปุ่ม "Auto" reset slot สีกลับ theme
//   • แสดงเฉพาะ Editor tab — ซ่อนอัตโนมัติใน AI / Cover / ฯลฯ
//
// 🎨 Color Palette (สีตัวอักษรและตกแต่ง)
//   • ColorSwatchPicker component — จาน 20 สี + hex input + native color picker
//   • 5 slots อิสระ: Body Text / Heading / Accent / Page Background / Divider
//   • "" = Auto (ใช้ theme ปัจจุบัน) — ปุ่ม ✕ reset กลับ Auto ได้ทันที
//   • theme object ถูก override ด้วย colorPalette อัตโนมัติ
//   • buildPageCSS inject headingColor ให้ h1/h2/h3 ทุก page
//   • SceneDividerRenderer ใช้ dividerColor จาก colorPalette ก่อน fallback theme.ink
//   • เก็บใน settings.colorPalette — export/import พร้อมโปรเจกต์
//
// ═══════════════════════════════════════════════════════════════════════════════
// CHANGES FROM V19 (mic-1):
//
// 🎙 Voice Dictation (Web Speech API — ฟรี ไม่ต้องใช้ API key)
//   • ใช้ webkitSpeechRecognition / SpeechRecognition built-in ใน Chrome/Edge/Android
//   • รองรับ iOS Safari ตั้งแต่ iOS 14.5 ขึ้นไป
//   • lang: th-TH + interimResults → พิมพ์ไทย-อังกฤษสลับกันได้
//   • ปุ่มไมค์วางก่อน {/* Page */} ในทั้ง normal editor และ focus mode
//   • interim text แสดงเป็น ghost text สีจาง ขณะพูด
//   • ผลลัพธ์ final ต่อท้าย content ของบทปัจจุบันอัตโนมัติ
//   • ปุ่มเป็น 🎙 (idle) / 🔴 (recording) พร้อม animation pulse
//   • ถ้าเบราว์เซอร์ไม่รองรับ ปุ่มจะ disable พร้อม tooltip แจ้ง
//
// ═══════════════════════════════════════════════════════════════════════════════
// CHANGES FROM V17:
//
// 🎯 Project Presets Overhaul (ทาง B + C)
//   • เปลี่ยนชื่อ "Templates" → "Project Presets" ในทุก UI
//   • แต่ละ Preset มี worldPreset (Locations, Organizations, Lore) เฉพาะตัว
//   • แต่ละ Preset มี characters เริ่มต้นที่เหมาะสมกับแนว
//   • 5 Presets หลักต่างกันชัดเจน: Fantasy, Romance, Sci-Fi, Dark Fantasy, Blank
//   • TemplatePicker แสดง "Includes: ✓ X ✓ Y" แทนข้อความ desc อย่างเดียว
//   • createFromTemplate นำ worldPreset + characters จาก preset มาใช้จริง
//
// ═══════════════════════════════════════════════════════════════════════════════
// CHANGES FROM V14:
//
// 🐛 Bug Fixes & Audit
//   • IndexedDB connection now cached (no repeated open calls)
//   • SceneBoard (Kanban) wired into mainTabs — was dead code
//   • SnapshotPanel wired: "📸 ดู Snapshot" button in Backup tab opens it
//   • DOCX / Markdown / EPUB import: hidden inputs rendered + wired to File menu
//   • File export filename: "_v5.novelforge" → ".novelforge"
//   • Removed stale images/selectedImageId/showImageProps from defaultSettings()
//   • Removed unused showImageProps state from main app
//   • Removed duplicate console.error in DOCX & EPUB import handlers
//   • Fixed wrong "Intl.Segmenter" comment in deleteProject catch block
//
// ═══════════════════════════════════════════════════════════════════════════════
// CHANGES FROM V13:
// ───────────────────────────────────────────────────────────────────────────────
// CHANGES FROM V11:
//
// 🖼 รูปภาพ & กรอบตกแต่ง — ทั้ง 3 ส่วน
//
//   📋 สารบัญ (TOC Decor):
//     • กรอบรอบ Heading: None / Simple Line / Double Line / Ornate / Rounded Box
//     • พื้นหลัง Heading: solid color, gradient, ภาพ upload
//     • Corner Ornaments: เลือก SVG 4 มุม
//     • บันทึกใน settings.tocStyle.decor
//
//   📖 หัวบท (Chapter Header Decor):
//     • Header Style: Plain / Banner / Framed / Full-Width Image / Split
//     • รูปพื้นหลังหัวบท (upload หรือจาก Assets)
//     • กรอบ & Ornament ตกแต่ง
//     • บันทึกใน settings.chapterHeaderStyle
//
//   📄 กรอบหน้า (Page Border):
//     • เปิด/ปิดกรอบรอบหน้า
//     • Style: Single / Double / Dashed / Ornate / Shadow
//     • ความหนา, สี, มุมโค้ง, ระยะห่าง
//     • บันทึกใน settings.pageBorder
//
// NOTE: Single-file architecture retained.
// ═══════════════════════════════════════════════════════════════════════════════
// CHANGES FROM V10:
//
// 📋 TOC (สารบัญ) Template & Style Editor
//   - TOC Templates 6 แบบ: Classic Dotted, Modern Minimal, Elegant Lines,
//     Numbered Box, Dark Novel, Magazine
//   - TOC Style Editor ใน Right Panel (tab ใหม่ "สารบัญ"):
//       • เลือก Template ด้วย Preview จริง
//       • ปรับ: Title heading, ตำแหน่ง heading, ขนาดฟอนต์, สีตัวเลขหน้า
//       • toggle: แสดง/ซ่อนเลขหน้า, แสดง/ซ่อน subtitle บท
//       • ตัวคั่น: dots, dashes, lines, spaces, custom
//   - tocStyle เก็บใน settings
//   - Export PDF/EPUB ใช้ tocStyle เดียวกัน
//
// ═══════════════════════════════════════════════════════════════════════════════
// CHANGES FROM V9:
//
// 📚 Template System Overhaul
//   - เพิ่ม Template ใหม่ 6 แนว: System/LitRPG, Apocalypse, Omegaverse,
//     Dark Fantasy, Manhwa/Webtoon, Slice-of-Magic
//   - Filter แนวใน Template Picker: ทั้งหมด / โรแมนซ์ / แฟนตาซี / ระทึก / อื่นๆ / Custom
//   - Custom Template Builder: กำหนด icon, ชื่อ, แนว, บท เอง
//     บันทึกใน localStorage — ใช้ซ้ำข้ามโปรเจกต์ได้
//   - Template cards แสดง badge หมวดหมู่
//
// ═══════════════════════════════════════════════════════════════════════════════
// CHANGES FROM V8:
//
// 🎨 Scene Divider Decorations (Pexels API)
//   - Divider panel ใหม่พร้อมของตกแต่ง 3 หมวด:
//       • ลวดลายข้อความ (เดิม + เพิ่มใหม่)
//       • SVG Ornaments (วิจิตรศิลป์ ดอกไม้ เส้น ฯลฯ)
//       • ภาพ Pexels — ค้นหาภาพพื้นหลังแนว texture / pattern
//   - สามารถกรอก Pexels API Key ในแผง Divider
//   - Preview แบบ real-time ก่อนเลือก
//   - dividerDecor เก็บใน settings: { type, svgId, imgUrl, imgCredit }
//
// NOTE: Single-file architecture retained for portability.
// ═══════════════════════════════════════════════════════════════════════════════

// CHANGES FROM V7:
//
// 🔴 Security
//   - Backend Proxy mode: AI calls route through /api/ai (no key exposed in browser)
//   - Proxy mode toggle in AI settings panel (Proxy vs Direct)
//   - Session keys only used as fallback in Direct mode
//
// 🔧 Quick Fixes
//   - DB_NAME: "NovelForgeV5" → "NovelForgeV8" (with migration from old DB)
//   - sessionStorage keys: nf5_* → nfa_* 
//   - project.version: "5" → "8"
//
// 🆕 Version Snapshot / History
//   - Each autosave optionally stores a snapshot (max 20 per project)
//   - Snapshot panel: browse, preview, restore any previous version
//   - Manual "Save Snapshot" button with custom label
//
// 🆕 Character Relationship Graph
//   - Visual SVG relationship graph inside CharactersPanel
//   - Add/edit/delete relationship edges (ประเภท + คำอธิบาย)
//   - Color-coded by relationship type
//
// 🆕 Scene Board (Kanban)
//   - New tab: Scene Board
//   - Drag-and-drop scenes across columns: Draft / Writing / Revision / Done
//   - Link scenes to chapters
//
// 🆕 Plot Consistency Checker (AI-powered)
//   - New AI tab: "consistency_deep"
//   - Checks: timeline conflicts, character age drift, location errors, plot holes
//   - Returns structured report with severity levels
//
// NOTE: Single-file architecture retained for portability.
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback, useReducer, useMemo, memo, createPortal } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// 🎙 VOICE DICTATION — Web Speech API (ฟรี, ไม่ต้องใช้ API key)
// ═══════════════════════════════════════════════════════════════════════════════

// Hook: จัดการ SpeechRecognition lifecycle
function useSpeechRecognition({ onInterim, onFinal }) {
  const recogRef      = useRef(null);
  const onFinalRef    = useRef(onFinal);
  const onInterimRef  = useRef(onInterim);
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  // อัปเดต ref ทุก render ป้องกัน stale closure
  useEffect(() => { onFinalRef.current   = onFinal;   });
  useEffect(() => { onInterimRef.current = onInterim; });

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    setIsSupported(true);

    const recog = new SpeechRecognition();
    recog.lang = "th-TH";
    recog.continuous = true;
    recog.interimResults = true;

    recog.onresult = (e) => {
      let interim = "";
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += t;
        else interim += t;
      }
      // ใช้ ref แทน closure ป้องกัน stale activeCh
      if (finalText) onFinalRef.current?.(finalText);
      onInterimRef.current?.(interim);
    };

    recog.onerror = (e) => {
      if (e.error !== "aborted") console.warn("SpeechRecognition error:", e.error);
      setIsListening(false);
      onInterimRef.current?.("");
    };

    recog.onend = () => {
      setIsListening(false);
      onInterimRef.current?.("");
    };

    recogRef.current = recog;
    return () => { try { recog.abort(); } catch(_) {} };
  }, []); // [] ถูกต้อง เพราะใช้ refs แทน callbacks

  const toggle = useCallback(() => {
    if (!recogRef.current) return;
    if (isListening) {
      recogRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recogRef.current.start();
        setIsListening(true);
      } catch(_) {}
    }
  }, [isListening]);

  return { isListening, isSupported, toggle };
}



// MicToolPanelBtn — icon-only สำหรับ left tool panel (snav-btn style)
function MicToolPanelBtn({ theme, activeCh, updateChapter, setMicInterim }) {
  // ref ป้องกัน stale closure ใน onFinal callback
  const activeChRef       = useRef(activeCh);
  const updateChapterRef  = useRef(updateChapter);
  useEffect(() => { activeChRef.current      = activeCh;      });
  useEffect(() => { updateChapterRef.current = updateChapter; });

  const { isListening, isSupported, toggle } = useSpeechRecognition({
    onInterim: (text) => {
      setMicInterim(text);
    },
    onFinal: (text) => {
      setMicInterim("");
      const ch = activeChRef.current;
      if (!ch) return;
      const cur = ch.content || "";
      const sep = cur.length > 0 && !cur.endsWith("\n") ? " " : "";
      updateChapterRef.current(ch.id, { content: cur + sep + text });
    },
  });

  // Clear interim when stopped
  useEffect(() => {
    if (!isListening) setMicInterim("");
  }, [isListening, setMicInterim]);

  return (
    <button
      onClick={isSupported ? toggle : undefined}
      disabled={!isSupported}
      title={
        !isSupported
          ? "เบราว์เซอร์นี้ไม่รองรับ (ใช้ Chrome/Edge/Safari iOS14.5+)"
          : isListening
          ? "กำลังฟัง… คลิกเพื่อหยุด"
          : "เปิดไมค์พูดแปลงเสียงเป็นข้อความ (ไทย/อังกฤษ)"
      }
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 2, padding: "8px 4px",
        border: "none",
        background: isListening ? "#ef444422" : "transparent",
        color: isListening ? "#ef4444" : theme.ink,
        opacity: isSupported ? (isListening ? 1 : 0.55) : 0.25,
        fontSize: 9, width: "100%", borderRadius: 6,
        transition: ".15s", cursor: isSupported ? "pointer" : "not-allowed",
        lineHeight: 1.2,
        boxShadow: isListening ? "0 0 0 2px #ef444444 inset" : "none",
        animation: isListening ? "mic-pulse 1.2s ease-in-out infinite" : "none",
        outline: "none",
      }}
    >
      <span style={{ fontSize: 16, marginBottom: 1 }}>
        {isListening ? "🔴" : "🎙"}
      </span>
      {isListening ? "ฟัง…" : "ไมค์"}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NFA BRAND — Logo, Favicon
// ═══════════════════════════════════════════════════════════════════════════════

// SVG Logo — Minimal Line (Sage Press style)
// N เส้นบาง + divider + NFA wordmark · Scandinavian editorial
function NFALogo({ size = 40, textColor = "#3d4a3e", accentColor = "#8faa8b", showText = false }) {
  // Minimal Line logo: แนวนอน N stroke + | + NFA / STUDIO
  // viewBox แนวนอน 180×65, scale จาก size (height-based)
  const h = size;
  const w = Math.round(size * (180 / 65));
  return (
    <svg width={w} height={h} viewBox="0 0 180 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* N — stroked, round caps */}
      <path d="M14,52 L14,12 L38,46 L38,12 M38,12 L56,12 L56,52"
        stroke={textColor} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* sage dot at top-right of N */}
      <circle cx="57" cy="12" r="3.2" fill={accentColor}/>
      {/* vertical divider */}
      <line x1="68" y1="16" x2="68" y2="48" stroke={accentColor} strokeWidth="1.3"/>
      {/* NFA wordmark */}
      <text x="80" y="36" fontFamily="Georgia,'Times New Roman',serif"
        fontWeight="700" fontSize="22" fill={textColor} letterSpacing="1">NFA</text>
      {/* STUDIO subtext */}
      <text x="80" y="51" fontFamily="Georgia,'Times New Roman',serif"
        fontSize="8.5" fill={accentColor} letterSpacing="5.5">STUDIO</text>
      {/* sage underline accent */}
      <line x1="80" y1="56" x2="148" y2="56" stroke={accentColor} strokeWidth="1.2"/>
    </svg>
  );
}

// Favicon — Minimal Line: N stroke + sage dot บน paper bg
function NFAFavicon() {
  useEffect(() => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>`
      + `<rect width='100' height='100' rx='18' fill='%23f7f4ef'/>`
      // N stroked
      + `<path d='M20,78 L20,22 L50,65 L50,22 M50,22 L80,22 L80,78' stroke='%233d4a3e' stroke-width='7' stroke-linecap='round' stroke-linejoin='round' fill='none'/>`
      // sage dot
      + `<circle cx='80' cy='22' r='8' fill='%238faa8b'/>`
      // sage underline
      + `<line x1='20' y1='88' x2='80' y2='88' stroke='%238faa8b' stroke-width='3'/>`
      + `</svg>`;
    const enc = svg.replace(/#/g, '%23');
    const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
    link.rel = "icon"; link.type = "image/svg+xml";
    link.href = `data:image/svg+xml,${enc}`;
    document.head.appendChild(link);
    document.title = "NFA Studio · Novel Flow Artist";
  }, []);
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPOGRAPHY UTILS  (inlined from TypographyUtils.js)
// ═══════════════════════════════════════════════════════════════════════════════

function _applyEllipsis(text) {
  text = text.replace(/\.{4}/g, "\u2026.");
  text = text.replace(/\.{3}/g, "\u2026");
  return text;
}

function _applyDashes(text) {
  text = text.replace(/---/g, "\u2014");
  text = text.replace(/\s*--\s*/g, "\u2014");
  return text;
}

function _applySmartDoubleQuotes(text) {
  return text.replace(/"/g, (match, offset, str) => {
    const before = str[offset - 1];
    const isOpening = offset === 0 || /[\s\n\r\u200B\(\[\{«»—,;:!?]/.test(before);
    return isOpening ? "\u201C" : "\u201D";
  });
}

function _applySmartSingleQuotes(text) {
  text = text.replace(/(\w)'(\w)/g, "$1\u2019$2");
  text = text.replace(/(\w)'/g, "$1\u2019");
  text = text.replace(/(^|[\s\n\r\u200B\(\[\{—,;:!?])'/g, "$1\u2018");
  text = text.replace(/'/g, "\u2019");
  return text;
}

function applySmartQuotes(text) {
  text = _applySmartDoubleQuotes(text);
  text = _applySmartSingleQuotes(text);
  return text;
}

function _applyThaiTypography(text) {
  text = text.replace(/[ \t]{2,}/g, " ");
  text = text.replace(/\s+(ๆ)/g, "$1");
  text = text.replace(/\s+(ฯ)/g, "$1");
  text = text.replace(/\.\s\.\s\./g, "\u2026");
  return text;
}

const DEFAULT_TYPO_OPTIONS = {
  ellipsis: true,
  emDash: true,
  smartQuotes: true,
  thaiTypography: true,
};

function applyTypography(text, options = {}) {
  if (!text) return text;
  const opts = { ...DEFAULT_TYPO_OPTIONS, ...options };
  if (opts.ellipsis)       text = _applyEllipsis(text);
  if (opts.emDash)         text = _applyDashes(text);
  if (opts.smartQuotes)    text = applySmartQuotes(text);
  if (opts.thaiTypography) text = _applyThaiTypography(text);
  return text;
}

function countTypographyIssues(text) {
  if (!text) return { ellipsis:0, dashes:0, quotes:0, total:0 };
  const ellipsis = (text.match(/\.{3}/g) || []).length;
  const dashes   = (text.match(/\s*--\s*/g) || []).length;
  const quotes   = (text.match(/['"]/g) || []).length;
  return { ellipsis, dashes, quotes, total: ellipsis + dashes + quotes };
}

function applyLiveTypography(nextText, cursorPos, options = {}) {
  const opts = { ...DEFAULT_TYPO_OPTIONS, ...options };
  const before = nextText.slice(0, cursorPos);
  const after = nextText.slice(cursorPos);
  let newBefore = before;
  let cursorDelta = 0;

  if (opts.ellipsis && newBefore.endsWith("...")) {
    newBefore = newBefore.slice(0, -3) + "\u2026";
    cursorDelta = -2;
  } else if (opts.emDash && newBefore.endsWith("--") && !newBefore.endsWith("---")) {
    newBefore = newBefore.slice(0, -2) + "\u2014";
    cursorDelta = -1;
  } else if (opts.smartQuotes) {
    const lastChar = newBefore[newBefore.length - 1];
    if (lastChar === '"') {
      const prevChar = newBefore[newBefore.length - 2];
      const isOpening = !prevChar || /[\s\n\r\u200B\(\[\{—,;:!?]/.test(prevChar);
      newBefore = newBefore.slice(0, -1) + (isOpening ? "\u201C" : "\u201D");
    } else if (lastChar === "'") {
      const prevChar = newBefore[newBefore.length - 2];
      const nextChar = after[0];
      if (prevChar && /\w/.test(prevChar) && nextChar && /\w/.test(nextChar)) {
        newBefore = newBefore.slice(0, -1) + "\u2019";
      } else {
        const isOpening = !prevChar || /[\s\n\r\u200B\(\[\{—,;:!?]/.test(prevChar);
        newBefore = newBefore.slice(0, -1) + (isOpening ? "\u2018" : "\u2019");
      }
    }
  }

  return { text: newBefore + after, cursorDelta };
}

function containsThai(text) { return /[\u0E00-\u0E7F]/.test(text); }

function insertThaiWordBreaks(text) {
  if (!containsThai(text)) return text;
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    try {
      const seg = new Intl.Segmenter("th", { granularity: "word" });
      return [...seg.segment(text)].map(s => s.segment).join("\u200B");
    } catch(e) { /* Intl.Segmenter not available, fallback used */ }
  }
  return text.replace(/([\u0E40-\u0E44]?)[\u0E01-\u0E2E\u0E30-\u0E39\u0E50-\u0E59]/g, (m, _, off) => off === 0 ? m : "\u200B" + m);
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPESETTING ENGINE  (inlined from TypesettingEngine.js)
// ═══════════════════════════════════════════════════════════════════════════════

const PARAGRAPH_FORMAT_DEFAULTS = {
  firstLineIndent: 2,   // em — ย่อหน้าแรกอัตโนมัติ (นิยายไทยมาตรฐาน)
  leftIndent:      0,   // px
  rightIndent:     0,   // px
  spaceBefore:     0,   // px
  spaceAfter:      8,   // px
  lineHeight:    185,   // percent
  textAlign: "justify",
};

const PARAGRAPH_PRESETS = {
  novel_thai:      { label:"นิยายไทย",       firstLineIndent:2,    leftIndent:0,  rightIndent:0,  spaceBefore:0,  spaceAfter:0,  lineHeight:200, textAlign:"justify" },
  novel_western:   { label:"Novel (Western)", firstLineIndent:1.5,  leftIndent:0,  rightIndent:0,  spaceBefore:0,  spaceAfter:0,  lineHeight:175, textAlign:"justify" },
  block_paragraphs:{ label:"Block Paragraphs",firstLineIndent:0,    leftIndent:0,  rightIndent:0,  spaceBefore:0,  spaceAfter:14, lineHeight:175, textAlign:"left"    },
  poetry:          { label:"Poetry / กลอน",  firstLineIndent:0,    leftIndent:24, rightIndent:24, spaceBefore:4,  spaceAfter:4,  lineHeight:200, textAlign:"left"    },
  blockquote:      { label:"Blockquote",      firstLineIndent:0,    leftIndent:32, rightIndent:32, spaceBefore:12, spaceAfter:12, lineHeight:185, textAlign:"left"    },
  centered:        { label:"Centered",        firstLineIndent:0,    leftIndent:0,  rightIndent:0,  spaceBefore:8,  spaceAfter:8,  lineHeight:175, textAlign:"center"  },
};

function paragraphFormatToStyle(fmt) {
  const f = { ...PARAGRAPH_FORMAT_DEFAULTS, ...fmt };
  return {
    textIndent:    f.firstLineIndent > 0 ? `${f.firstLineIndent}em` : undefined,
    paddingLeft:   f.leftIndent  > 0 ? `${f.leftIndent}px`  : undefined,
    paddingRight:  f.rightIndent > 0 ? `${f.rightIndent}px` : undefined,
    marginTop:    `${f.spaceBefore}px`,
    marginBottom: `${f.spaceAfter}px`,
    lineHeight:   `${(f.lineHeight / 100).toFixed(2)}`,
    textAlign:     f.textAlign,
    wordBreak:    "normal",
    overflowWrap: "anywhere",
    lineBreak:    "strict",
    hyphens:      "none",
  };
}

function buildPageCSS(settings, layoutSize, fmt, theme) {
  const f = { ...PARAGRAPH_FORMAT_DEFAULTS, ...fmt };
  const lh = (f.lineHeight / 100).toFixed(2);
  const pLeft  = (settings.marginH || 52) + f.leftIndent;
  const pRight = (settings.marginH || 52) + f.rightIndent;
  const pV = settings.marginV || 56;
  const headingColor = settings.colorPalette?.headingText || theme.accent;
  return `
.page-for-export {
  background: ${theme.bg};
  width: ${layoutSize.px.w}px;
  min-height: ${layoutSize.px.h}px;
  padding: ${pV}px ${pRight}px ${pV}px ${pLeft}px;
  font-family: '${settings.font}', 'Noto Serif Thai', 'Sarabun', sans-serif;
  font-size: ${settings.fontSize}px;
  line-height: ${lh};
  text-align: ${f.textAlign};
  color: ${theme.ink};
  position: relative;
  box-shadow: 0 4px 32px #0002;
  margin: 0 auto;
  word-break: normal;
  overflow-wrap: anywhere;
  line-break: strict;
  hyphens: none;
  box-sizing: border-box;
}
.page-for-export p {
  text-indent: ${f.firstLineIndent > 0 ? f.firstLineIndent + "em" : "0"};
  margin-top: ${f.spaceBefore}px;
  margin-bottom: ${f.spaceAfter}px;
  text-align: ${f.textAlign};
  word-break: normal;
  overflow-wrap: anywhere;
  line-break: strict;
}
.drop-cap-first::first-letter {
  float: left; font-size: 3.2em; line-height: 0.8;
  margin-right: 6px; margin-top: 4px;
  font-weight: 700; color: ${theme.accent};
}
.page-for-export h1, .page-for-export h2, .page-for-export h3 {
  color: ${headingColor};
}
.nfa-textbox {
  border: 1.5px solid #999;
  border-radius: 6px;
  padding: 14px 18px;
  margin: 20px auto;
  width: 80%;
  min-height: 72px;
  background: #fff;
  resize: vertical;
  overflow: auto;
  outline: none;
  font-size: inherit;
  line-height: 1.7;
  box-shadow: 0 1px 4px rgba(0,0,0,.07);
  color: inherit;
  font-family: inherit;
  cursor: text;
  transition: border-color .15s, box-shadow .15s;
}
.nfa-textbox:focus {
  border-color: ${theme.accent};
  box-shadow: 0 0 0 2px ${theme.accent}33;
}
.nfa-textbox:empty::before {
  content: attr(data-placeholder);
  color: #aaa;
  pointer-events: none;
}
  `.trim();
}

// ═══════════════════════════════════════════════════════════════════════════════
// PARAGRAPH CONTROLS COMPONENT  (inlined from ParagraphControls.jsx)
// ═══════════════════════════════════════════════════════════════════════════════

function IconAlignLeft({ size=14, color="currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"><line x1="1" y1="4" x2="15" y2="4"/><line x1="1" y1="8" x2="10" y2="8"/><line x1="1" y1="12" x2="13" y2="12"/></svg>;
}
function IconAlignCenter({ size=14, color="currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"><line x1="1" y1="4" x2="15" y2="4"/><line x1="3.5" y1="8" x2="12.5" y2="8"/><line x1="1.5" y1="12" x2="14.5" y2="12"/></svg>;
}
function IconAlignRight({ size=14, color="currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"><line x1="1" y1="4" x2="15" y2="4"/><line x1="6" y1="8" x2="15" y2="8"/><line x1="3" y1="12" x2="15" y2="12"/></svg>;
}
function IconAlignJustify({ size=14, color="currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"><line x1="1" y1="4" x2="15" y2="4"/><line x1="1" y1="8" x2="15" y2="8"/><line x1="1" y1="12" x2="15" y2="12"/></svg>;
}

const _ALIGN_OPTIONS = [
  { id:"left",    icon:IconAlignLeft,    label:"ชิดซ้าย",   labelEn:"Left"    },
  { id:"center",  icon:IconAlignCenter,  label:"กึ่งกลาง",  labelEn:"Center"  },
  { id:"right",   icon:IconAlignRight,   label:"ชิดขวา",    labelEn:"Right"   },
  { id:"justify", icon:IconAlignJustify, label:"เต็มบรรทัด",labelEn:"Justify" },
];

function _SliderRow({ label, value, min, max, step=1, unit="px", onChange, theme }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:9}}>
      <label style={{fontSize:11,opacity:.65,width:90,flexShrink:0,lineHeight:1.3}}>{label}</label>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e=>onChange(Number(e.target.value))}
        style={{flex:1,accentColor:theme.accent,cursor:"pointer"}}/>
      <span style={{fontSize:11,opacity:.8,width:42,textAlign:"right",flexShrink:0,fontVariantNumeric:"tabular-nums",color:theme.accent,fontWeight:600}}>
        {unit==="em"?value.toFixed(2):value}{unit}
      </span>
    </div>
  );
}

function _SecHead({ children, theme, badge }) {
  return (
    <div style={{fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:".12em",opacity:.4,margin:"16px 0 8px",paddingBottom:4,borderBottom:`1px solid ${theme.border}`,display:"flex",alignItems:"center",gap:6}}>
      {children}
      {badge && <span style={{padding:"1px 5px",background:theme.accent,color:"#fff",borderRadius:20,fontSize:9,fontWeight:800,opacity:1}}>{badge}</span>}
    </div>
  );
}

function _ToggleRow({ label, checked, onChange, theme, badge }) {
  return (
    <label style={{display:"flex",alignItems:"center",gap:8,marginBottom:7,cursor:"pointer",fontSize:12}}>
      <input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)} style={{accentColor:theme.accent,cursor:"pointer"}}/>
      <span style={{flex:1}}>{label}</span>
      {badge>0 && <span style={{fontSize:9,fontWeight:700,padding:"1px 5px",borderRadius:20,background:`${theme.accent}22`,color:theme.accent}}>{badge}</span>}
    </label>
  );
}

function _TypesettingPreview({ format, theme, font }) {
  const lh = ((format.lineHeight||185)/100).toFixed(2);
  const sample = "ณ ชายแดนที่ขอบฟ้าแห่งอาณาจักร สายลมพัดผ่านทุ่งหญ้าสีทองราวกับการโอดครวญ เซล่า หญิงสาวผมดำ ยืนอยู่บนหน้าผาสูงชัน สายตาปักแน่นอยู่ที่ขอบฟ้าอันไกลโพ้น…";
  return (
    <div style={{marginTop:10,padding:"10px 12px",background:`${theme.border}22`,borderRadius:8,border:`1px solid ${theme.border}`}}>
      <div style={{fontSize:9,opacity:.4,marginBottom:6,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em"}}>Preview</div>
      <p style={{fontSize:11,fontFamily:`'${font}','Sarabun',sans-serif`,lineHeight:lh,textAlign:format.textAlign||"justify",textIndent:format.firstLineIndent>0?`${format.firstLineIndent}em`:undefined,paddingLeft:format.leftIndent>0?`${format.leftIndent}px`:undefined,paddingRight:format.rightIndent>0?`${format.rightIndent}px`:undefined,margin:0,color:theme.ink,wordBreak:"normal",overflowWrap:"anywhere"}}>
        {sample}
      </p>
    </div>
  );
}

// ── COLOR SWATCH PICKER ──────────────────────────────────────────────────────
// จานสี quick-pick + hex input สำหรับเลือกสีแต่ละ slot
const _PALETTE_PRESETS = [
  "#1a1612","#2a1f0f","#ffffff","#f5ede0","#fffef9",
  "#8b4513","#7a3b10","#c4773a","#4a90d9","#2d7a4f",
  "#9b59b6","#e74c3c","#e67e22","#1abc9c","#2c3e50",
  "#6c5ce7","#fd79a8","#00b894","#0984e3","#d63031",
];

function ColorSwatchPicker({ label, value, onChange, theme, allowEmpty=true, emptyLabel="Auto" }) {
  const [showHex, setShowHex] = useState(false);
  const [hexInput, setHexInput] = useState(value||"");
  const accent = theme?.accent||"#8b4513";
  const border = theme?.border||"#d8cfc2";
  const ink    = theme?.ink||"#1a1612";
  const panel  = theme?.panel||"#f0ebe3";

  function commit(c) {
    onChange(c);
    setHexInput(c);
    setShowHex(false);
  }

  function handleHexCommit() {
    const c = hexInput.trim();
    if (!c) { onChange(""); setShowHex(false); return; }
    const valid = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(c);
    if (valid) commit(c);
  }

  const display = value || (allowEmpty ? "" : (theme?.ink||"#1a1612"));

  return (
    <div style={{marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}>
        <span style={{fontSize:11,opacity:.7}}>{label}</span>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          {/* สีปัจจุบัน */}
          <div style={{
            width:20,height:20,borderRadius:4,
            background: display || "transparent",
            border: display ? `1.5px solid ${border}` : `1.5px dashed ${border}`,
            cursor:"pointer", flexShrink:0,
            display:"flex",alignItems:"center",justifyContent:"center",
          }} title={display||emptyLabel} onClick={()=>setShowHex(v=>!v)}>
            {!display && <span style={{fontSize:9,opacity:.4,lineHeight:1}}>A</span>}
          </div>
          <button onClick={()=>setShowHex(v=>!v)} style={{
            fontSize:10,padding:"2px 7px",border:`1px solid ${border}`,
            borderRadius:5,background:"transparent",color:ink,cursor:"pointer",opacity:.7,
          }}>{showHex?"▲ ปิด":"✎ แก้ไข"}</button>
          {allowEmpty && value && (
            <button onClick={()=>commit("")} style={{
              fontSize:10,padding:"2px 6px",border:`1px solid #ef444444`,
              borderRadius:5,background:"transparent",color:"#ef4444",cursor:"pointer",
            }} title={`ใช้ ${emptyLabel}`}>✕</button>
          )}
        </div>
      </div>

      {/* Swatch grid */}
      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:4}}>
        {allowEmpty && (
          <button onClick={()=>commit("")} title={emptyLabel} style={{
            width:20,height:20,borderRadius:4,border:`1.5px dashed ${value===""?accent:border}`,
            background:"transparent",cursor:"pointer",fontSize:8,color:value===""?accent:ink,
            display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:value===""?`0 0 0 2px ${accent}44`:"none",flexShrink:0,
          }}>A</button>
        )}
        {_PALETTE_PRESETS.map(c=>(
          <button key={c} onClick={()=>commit(c)} title={c} style={{
            width:20,height:20,borderRadius:4,background:c,cursor:"pointer",
            border:`1.5px solid ${value===c?accent:border}`,
            boxShadow:value===c?`0 0 0 2px ${accent}55`:"none",
            flexShrink:0, transition:".1s",
          }}/>
        ))}
      </div>

      {/* Hex input + native color picker */}
      {showHex && (
        <div style={{display:"flex",alignItems:"center",gap:5,marginTop:4,padding:"6px 8px",background:`${border}33`,borderRadius:7}}>
          <input type="color" value={display||"#000000"}
            onChange={e=>{ setHexInput(e.target.value); onChange(e.target.value); }}
            style={{width:28,height:28,borderRadius:4,border:"none",cursor:"pointer",padding:0,background:"transparent"}}/>
          <input type="text" value={hexInput}
            onChange={e=>setHexInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter")handleHexCommit();}}
            onBlur={handleHexCommit}
            placeholder="#rrggbb"
            style={{flex:1,padding:"4px 7px",border:`1px solid ${border}`,borderRadius:5,fontSize:11,background:panel,color:ink,outline:"none",fontFamily:"monospace"}}/>
          <button onClick={handleHexCommit} style={{padding:"4px 8px",background:accent,color:"#fff",border:"none",borderRadius:5,fontSize:11,cursor:"pointer",fontWeight:700}}>✓</button>
        </div>
      )}
    </div>
  );
}

const ParagraphControls = memo(function ParagraphControls({ format={}, onFormatChange, typoOptions={}, onTypoChange, onApplyTypography, chapters=[], theme, font="Sarabun", settings={}, setSetting, FONTS=[], LAYOUT_PRESETS={} }) {
  const [showPreview, setShowPreview] = useState(true);
  const [activePreset, setActivePreset] = useState(null);
  const fmt = { ...PARAGRAPH_FORMAT_DEFAULTS, ...format };
  const typo = { ...DEFAULT_TYPO_OPTIONS, ...typoOptions };
  const allText = chapters.map(c=>stripHtml(c.content||"")).join("\n\n");
  const issues = countTypographyIssues(allText);
  const accent=theme?.accent||"#8b4513", border=theme?.border||"#e8e0d5", ink=theme?.ink||"#1a1612", accentLight=theme?.accentLight||"#8b451322";

  function applyPreset(key) {
    const p = PARAGRAPH_PRESETS[key]; if(!p) return;
    onFormatChange?.({...p}); setActivePreset(key);
  }

  return (
    <div style={{color:ink}}>
      {/* Font */}
      <_SecHead theme={theme}>ฟอนต์</_SecHead>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:10}}>
        {FONTS.map(f=>(
          <button key={f} onClick={()=>setSetting?.("font",f)} style={{padding:"5px 8px",border:`1.5px solid ${settings.font===f?accent:border}`,borderRadius:8,fontSize:12,cursor:"pointer",background:settings.font===f?accentLight:"transparent",color:settings.font===f?accent:ink,fontFamily:`'${f}',sans-serif`,transition:".12s"}}>{f}</button>
        ))}
      </div>

      {/* Size & spacing */}
      <_SecHead theme={theme}>ขนาดและระยะ</_SecHead>
      <_SliderRow label="ขนาดตัวอักษร" value={settings.fontSize||15} min={10} max={72} unit="px" onChange={v=>setSetting?.("fontSize",v)} theme={theme}/>
      <_SliderRow label="Line Height"   value={fmt.lineHeight} min={120} max={280} unit="%" onChange={v=>onFormatChange?.({lineHeight:v})} theme={theme}/>
      <_SliderRow label="Space Before ↑" value={fmt.spaceBefore} min={0} max={48} unit="px" onChange={v=>onFormatChange?.({spaceBefore:v})} theme={theme}/>
      <_SliderRow label="Space After ↓"  value={fmt.spaceAfter}  min={0} max={48} unit="px" onChange={v=>onFormatChange?.({spaceAfter:v})}  theme={theme}/>

      {/* Indentation */}
      <_SecHead theme={theme}>การย่อหน้า</_SecHead>
      <_SliderRow label="First Line" value={fmt.firstLineIndent} min={0} max={5} step={0.25} unit="em" onChange={v=>onFormatChange?.({firstLineIndent:v})} theme={theme}/>
      <_SliderRow label="Left Indent"  value={fmt.leftIndent}  min={0} max={80} unit="px" onChange={v=>onFormatChange?.({leftIndent:v})}  theme={theme}/>
      <_SliderRow label="Right Indent" value={fmt.rightIndent} min={0} max={80} unit="px" onChange={v=>onFormatChange?.({rightIndent:v})} theme={theme}/>

      {/* Page margins */}
      <_SecHead theme={theme}>Margin หน้า</_SecHead>
      <_SliderRow label="Margin บน/ล่าง"  value={settings.marginV||56} min={20} max={100} unit="px" onChange={v=>setSetting?.("marginV",v)} theme={theme}/>
      <_SliderRow label="Margin ซ้าย/ขวา" value={settings.marginH||52} min={20} max={100} unit="px" onChange={v=>setSetting?.("marginH",v)} theme={theme}/>

      {/* Text alignment */}
      <_SecHead theme={theme}>การจัดวางข้อความ</_SecHead>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginBottom:10}}>
        {_ALIGN_OPTIONS.map(a=>{
          const Icon=a.icon; const isActive=fmt.textAlign===a.id;
          return (
            <button key={a.id} title={`${a.labelEn} (${a.label})`} onClick={()=>onFormatChange?.({textAlign:a.id})} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,padding:"8px 4px",border:`1.5px solid ${isActive?accent:border}`,borderRadius:8,background:isActive?accentLight:"transparent",color:isActive?accent:ink,cursor:"pointer",transition:".12s",fontSize:9,fontWeight:isActive?700:400}}>
              <Icon size={14} color={isActive?accent:ink}/>{a.label}
            </button>
          );
        })}
      </div>

      {/* Options */}
      <_SecHead theme={theme}>ตัวเลือกพิเศษ</_SecHead>
      <_ToggleRow label="Drop Cap ตัวอักษรแรก" checked={settings.dropCap||false} onChange={v=>setSetting?.("dropCap",v)} theme={theme}/>

      {/* Presets */}
      <_SecHead theme={theme}>Presets</_SecHead>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:6}}>
        {Object.entries(PARAGRAPH_PRESETS).map(([key,p])=>(
          <button key={key} onClick={()=>applyPreset(key)} style={{padding:"6px 8px",border:`1.5px solid ${activePreset===key?accent:border}`,borderRadius:8,fontSize:11,cursor:"pointer",background:activePreset===key?accentLight:"transparent",color:activePreset===key?accent:ink,textAlign:"center",transition:".12s"}}>{p.label}</button>
        ))}
      </div>
      {Object.keys(LAYOUT_PRESETS).length>0 && (
        <>
          <_SecHead theme={theme}>Layout Presets</_SecHead>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,marginBottom:10}}>
            {Object.entries(LAYOUT_PRESETS).map(([k,p])=>(
              <button key={k} onClick={()=>Object.entries(p).forEach(([pk,pv])=>{if(pk!=="label")setSetting?.(pk,pv);})} style={{padding:"5px 6px",border:`1.5px solid ${border}`,borderRadius:8,fontSize:10,cursor:"pointer",background:"transparent",color:ink,transition:".12s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=accent;e.currentTarget.style.color=accent;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=border;e.currentTarget.style.color=ink;}}
              >{p.label}</button>
            ))}
          </div>
        </>
      )}
      <button onClick={()=>{onFormatChange?.({...PARAGRAPH_FORMAT_DEFAULTS});setActivePreset(null);}} style={{width:"100%",padding:"6px",border:`1px solid ${border}`,borderRadius:8,fontSize:11,cursor:"pointer",background:"transparent",color:ink,opacity:.6,marginBottom:10}}>↺ Reset เป็นค่าเริ่มต้น</button>

      {/* ─── สีตัวอักษรและตกแต่ง ─────────────────────────────── */}
      <_SecHead theme={theme}>สีตัวอักษรและตกแต่ง</_SecHead>
      <div style={{marginBottom:4}}>
        {[
          { key:"bodyText",    label:"สีเนื้อหา (Body Text)",   emptyLabel:"Auto (ตาม Theme)" },
          { key:"headingText", label:"สีหัวบท / Heading",        emptyLabel:"Auto (ตาม Theme)" },
          { key:"accentColor", label:"สี Accent / ลวดลาย",       emptyLabel:"Auto (ตาม Theme)" },
          { key:"bgPage",      label:"สีพื้นหลังหน้า",           emptyLabel:"Auto (ตาม Theme)" },
          { key:"dividerColor",label:"สี Divider / ตัวคั่น",     emptyLabel:"Auto (ตาม Theme)" },
        ].map(({key,label,emptyLabel})=>(
          <ColorSwatchPicker
            key={key}
            label={label}
            value={(settings.colorPalette||{})[key]||""}
            onChange={v=>setSetting?.("colorPalette",{...(settings.colorPalette||{}), [key]:v})}
            theme={theme}
            allowEmpty={true}
            emptyLabel={emptyLabel}
          />
        ))}
        <p style={{fontSize:10,opacity:.4,lineHeight:1.5,marginTop:2,marginBottom:0}}>
          "Auto" = ใช้สีจาก Theme ปัจจุบัน • ตั้งค่าสีเองจะ override Theme
        </p>
      </div>

      {/* Typography transforms */}
      <_SecHead theme={theme} badge={issues.total>0?issues.total:null}>Typography Transforms</_SecHead>
      <_ToggleRow label="... → … (Ellipsis)"      checked={typo.ellipsis}       onChange={v=>onTypoChange?.({ellipsis:v})}       theme={theme} badge={issues.ellipsis}/>
      <_ToggleRow label="-- → — (Em Dash)"         checked={typo.emDash}         onChange={v=>onTypoChange?.({emDash:v})}         theme={theme} badge={issues.dashes}/>
      <_ToggleRow label={`"..." → \u201c\u2026\u201d (Smart Quotes)`} checked={typo.smartQuotes} onChange={v=>onTypoChange?.({smartQuotes:v})} theme={theme} badge={issues.quotes}/>
      <_ToggleRow label="Thai Typography Fixes"    checked={typo.thaiTypography} onChange={v=>onTypoChange?.({thaiTypography:v})} theme={theme}/>
      <button onClick={onApplyTypography} disabled={issues.total===0} style={{width:"100%",padding:"9px 14px",background:issues.total>0?accent:`${border}44`,color:issues.total>0?"#fff":ink,border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:issues.total>0?"pointer":"default",marginBottom:4,opacity:issues.total>0?1:.5,transition:".15s",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
        ✦ Apply ให้ทุกบท
        {issues.total>0 && <span style={{background:"#fff3",borderRadius:20,padding:"0 6px",fontSize:11}}>{issues.total} รายการ</span>}
      </button>
      <p style={{fontSize:10,opacity:.4,lineHeight:1.5,marginBottom:4}}>แปลงข้อความทุกบทพร้อมกัน — ไม่สามารถ Undo ได้</p>

      {/* Preview */}
      <div style={{marginTop:12,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={{fontSize:10,opacity:.45,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em"}}>Preview</span>
        <button onClick={()=>setShowPreview(v=>!v)} style={{padding:"2px 8px",border:`1px solid ${border}`,borderRadius:6,fontSize:10,cursor:"pointer",background:"transparent",color:ink,opacity:.6}}>{showPreview?"ซ่อน":"แสดง"}</button>
      </div>
      {showPreview && <_TypesettingPreview format={fmt} theme={theme} font={font}/>}
    </div>
  );
}
);

// ═══════════════════════════════════════════════════════════════════════════════
// IMAGE LAYOUT ENGINE  (inlined from ImageLayoutEngine.js)
// ═══════════════════════════════════════════════════════════════════════════════

const IMAGE_DEFAULTS = {
  src:"", alt:"", caption:"",
  wrapMode:"inline", alignment:"left",
  width:240, height:180, x:0, y:0,
  borderRadius:0, objectFit:"cover",
  brightness:100, contrast:100, opacity:1, grayscale:false,
  rotation:0,   // องศา 0–359
  insertionIndex:-1,
  exportMeta:{ pdfAlt:"", pdfDecorative:false, epubRole:"doc-illustration", epubLandmark:"", epubInSpine:false, epubMediaType:"" },
};

function _newImgId() { return `img_${Date.now()}_${Math.floor(Math.random()*1e6)}`; }

function createImage(chapterId="", overrides={}) {
  return { ...IMAGE_DEFAULTS, exportMeta:{ ...IMAGE_DEFAULTS.exportMeta, ...(overrides.exportMeta||{}) }, ...overrides, id:_newImgId(), chapterId, insertedAt:new Date().toISOString() };
}
function updateImage(image, patch) {
  const merged = { ...image, ...patch, exportMeta:{ ...image.exportMeta, ...(patch.exportMeta||{}) } };
  const VM=["inline","square","tight","behind_text","in_front"], VA=["left","center","right"], VO=["cover","contain","fill","none"];
  if (!VM.includes(merged.wrapMode))   merged.wrapMode  ="inline";
  if (!VA.includes(merged.alignment))  merged.alignment ="left";
  if (!VO.includes(merged.objectFit))  merged.objectFit ="cover";
  merged.width      = Math.max(60,  Math.min(4000, Math.round(merged.width||240)));
  merged.height     = Math.max(40,  Math.min(4000, Math.round(merged.height||180)));
  merged.x          = Math.max(0,   Math.round(merged.x||0));
  merged.y          = Math.max(0,   Math.round(merged.y||0));
  merged.borderRadius = Math.max(0, Math.min(500, Math.round(merged.borderRadius||0)));
  merged.brightness = Math.max(0,   Math.min(200, merged.brightness!==undefined?merged.brightness:100));
  merged.contrast   = Math.max(0,   Math.min(200, merged.contrast!==undefined?merged.contrast:100));
  merged.opacity    = Math.max(0,   Math.min(1,   merged.opacity!==undefined?merged.opacity:1));
  merged.rotation   = ((merged.rotation||0) % 360 + 360) % 360;  // normalize 0-359
  merged.grayscale  = !!merged.grayscale;
  return merged;
}
function deleteImage(images, id) { return images.filter(img=>img.id!==id); }
function getImagesForChapter(images, chapterId) { return images.filter(img=>img.chapterId===chapterId); }
function serializeImages(images, { stripSrc=false }={}) { return images.map(img=>({ ...img, src:stripSrc?"":img.src, exportMeta:{ ...IMAGE_DEFAULTS.exportMeta, ...img.exportMeta } })); }
function deserializeImages(raw) { if (!Array.isArray(raw)) return []; return raw.map(item=>updateImage({ ...IMAGE_DEFAULTS, exportMeta:{ ...IMAGE_DEFAULTS.exportMeta } }, item)); }
function fitImageDimensions(naturalW, naturalH, maxW=320, maxH=400) {
  if (!naturalW||!naturalH) return { width:240, height:180 };
  const aspect=naturalW/naturalH; let w=Math.min(naturalW,maxW), h=Math.round(w/aspect);
  if (h>maxH) { h=maxH; w=Math.round(h*aspect); }
  return { width:Math.round(w), height:Math.round(h) };
}
function getImageNaturalSize(src) {
  return new Promise(resolve=>{ const img=new Image(); img.onload=()=>resolve({width:img.naturalWidth,height:img.naturalHeight}); img.onerror=()=>resolve({width:0,height:0}); img.src=src; });
}
function removeImageMarker(content, imageId) { return content.replace(new RegExp(`\\n?\\[IMAGE:${imageId}\\]\\n?`,"g"),""); }
function insertImageMarker(content, imageId, charOffset=-1) {
  const marker=`[IMAGE:${imageId}]`;
  if (charOffset<0||charOffset>=content.length) return content+"\n"+marker+"\n";
  return content.slice(0,charOffset)+"\n"+marker+"\n"+content.slice(charOffset);
}
function _escAttr(s) { return String(s).replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function _escHTML(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function _styleObjToCSS(obj) { return Object.entries(obj).map(([k,v])=>`${k.replace(/([A-Z])/g,m=>`-${m.toLowerCase()}`)}:${v}`).join(";"); }
function _detectMediaType(src) {
  if (!src) return "image/jpeg";
  if (src.startsWith("data:image/png"))  return "image/png";
  if (src.startsWith("data:image/gif"))  return "image/gif";
  if (src.startsWith("data:image/webp")) return "image/webp";
  if (src.startsWith("data:image/svg"))  return "image/svg+xml";
  return "image/jpeg";
}
function _mediaTypeToExt(mt) { return {"image/jpeg":".jpg","image/png":".png","image/gif":".gif","image/webp":".webp","image/svg+xml":".svg"}[mt]||".jpg"; }
function _imageToHTML(image, { forPDF=false, forEPUB=false }={}) {
  const { wrapMode, alignment, width, height, x, y, borderRadius, objectFit, brightness, contrast, opacity, grayscale } = image;
  const isAbs = wrapMode==="behind_text"||wrapMode==="in_front";
  const imgStyle = { display:"block", width:isAbs?"100%":`${width}px`, height:isAbs?"100%":`${height}px`, objectFit:objectFit||"cover", borderRadius:borderRadius?`${borderRadius}px`:0, opacity:opacity!==undefined?opacity:1 };
  const filters=[]; if(brightness!==100) filters.push(`brightness(${brightness}%)`); if(contrast!==100) filters.push(`contrast(${contrast}%)`); if(grayscale) filters.push("grayscale(100%)"); if(filters.length) imgStyle.filter=filters.join(" ");
  let container = { position:"relative", display:"inline-block" };
  if(wrapMode==="inline") container={...container,display:"block",width:alignment==="center"?"fit-content":`${width}px`,maxWidth:"100%",margin:alignment==="center"?"12px auto":alignment==="right"?"12px 0 12px auto":"12px 0"};
  else if(wrapMode==="square"||wrapMode==="tight") container={...container,float:alignment==="right"?"right":"left",width:`${width}px`,margin:alignment==="right"?"4px 0 8px 16px":"4px 16px 8px 0"};
  else if(wrapMode==="behind_text") container={...container,position:"absolute",left:`${x||0}px`,top:`${y||0}px`,width:`${width}px`,height:`${height}px`,zIndex:0,margin:0};
  else if(wrapMode==="in_front") container={...container,position:"absolute",left:`${x||0}px`,top:`${y||0}px`,width:`${width}px`,height:`${height}px`,zIndex:100,margin:0};
  const altText=forPDF?(image.exportMeta?.pdfDecorative?"":(image.exportMeta?.pdfAlt||image.alt||"")):(image.alt||"");
  const altAttr=altText?` alt="${_escAttr(altText)}"`:' alt=""';
  const roleAttr=forEPUB&&image.exportMeta?.epubRole?` epub:type="${_escAttr(image.exportMeta.epubRole)}"` :"";
  if(forEPUB&&image.caption) return `<figure style="${_styleObjToCSS(container)}"><img src="${image.src}"${altAttr}${roleAttr} style="${_styleObjToCSS(imgStyle)}"/><figcaption>${_escHTML(image.caption)}</figcaption></figure>`;
  return `<div style="${_styleObjToCSS(container)}"><img src="${image.src}"${altAttr}${roleAttr} style="${_styleObjToCSS(imgStyle)}"/>${image.caption?`<div style="text-align:center;font-size:0.85em;font-style:italic;margin-top:4px;">${_escHTML(image.caption)}</div>`:""}</div>`;
}
function buildPDFImageManifest(images) {
  const all=images.map(img=>({ id:img.id, chapterId:img.chapterId, src:img.src, alt:img.exportMeta?.pdfDecorative?null:(img.exportMeta?.pdfAlt||img.alt||null), decorative:!!img.exportMeta?.pdfDecorative, layout:{wrapMode:img.wrapMode,alignment:img.alignment,width:img.width,height:img.height,x:img.x||0,y:img.y||0}, adjustments:{brightness:img.brightness||100,contrast:img.contrast||100,opacity:img.opacity!==undefined?img.opacity:1,grayscale:!!img.grayscale}, borderRadius:img.borderRadius||0, objectFit:img.objectFit||"cover", caption:img.caption||null, htmlSnippet:_imageToHTML(img,{forPDF:true}) }));
  const byChapter={};
  for(const meta of all){ if(!byChapter[meta.chapterId]) byChapter[meta.chapterId]=[]; byChapter[meta.chapterId].push(meta); }
  return { byChapter, all };
}
function buildEPUBImageManifest(images) {
  const manifestItems=[],spineItems=[],landmarks=[],inlineByChapter={};
  images.forEach((image,i)=>{
    const mt=image.exportMeta?.epubMediaType||_detectMediaType(image.src), ext=_mediaTypeToExt(mt), filename=`images/img_${String(i).padStart(4,"0")}_${image.id}${ext}`, itemId=`image-${image.id}`;
    const props=[]; if(image.exportMeta?.epubRole==="doc-cover") props.push("cover-image");
    const manifestItem={id:itemId,href:filename,mediaType:mt,properties:props.join(" ")};
    const spineItem=image.exportMeta?.epubInSpine?{idref:`spine-${itemId}`,linear:"yes"}:null;
    const landmark=image.exportMeta?.epubLandmark?{href:filename,type:image.exportMeta.epubLandmark,title:image.caption||image.alt||"Image"}:null;
    const inlineHTML=_imageToHTML(image,{forEPUB:true});
    manifestItems.push(manifestItem); if(spineItem) spineItems.push(spineItem); if(landmark) landmarks.push(landmark);
    if(!inlineByChapter[image.chapterId]) inlineByChapter[image.chapterId]=[];
    inlineByChapter[image.chapterId].push({id:image.id,chapterId:image.chapterId,src:image.src,filename,inlineHTML});
  });
  return { manifestItems, spineItems, landmarks, inlineByChapter };
}
function generateOPFManifestFragment(images) {
  const { manifestItems }=buildEPUBImageManifest(images);
  return manifestItems.map(item=>{ const p=item.properties?` properties="${item.properties}"`:""; return `    <item id="${item.id}" href="${item.href}" media-type="${item.mediaType}"${p}/>`; }).join("\n");
}

// ═══════════════════════════════════════════════════════════════════════════════
// IMAGE BLOCK  (inlined from ImageBlock.jsx)
// ═══════════════════════════════════════════════════════════════════════════════

const WRAP_MODES = [
  { id:"inline",      icon:"⬛", label:"Inline",       desc:"Flows with text like a paragraph" },
  { id:"square",      icon:"◧",  label:"Square",       desc:"Text wraps with square gap" },
  { id:"tight",       icon:"◈",  label:"Tight",        desc:"Text wraps close to the image" },
  { id:"behind_text", icon:"⬚",  label:"Behind Text",  desc:"Image sits behind the text layer" },
  { id:"in_front",    icon:"◼",  label:"In Front",     desc:"Image floats above the text layer" },
];
const ALIGN_OPTIONS = [
  { id:"left",   icon:"◁", label:"Left"   },
  { id:"center", icon:"—", label:"Center" },
  { id:"right",  icon:"▷", label:"Right"  },
];
const MIN_IW=60, MIN_IH=40, HANDLE_SIZE=10;

function ResizeHandle({ position, onMouseDown, accent }) {
  const cursors={nw:"nw-resize",n:"n-resize",ne:"ne-resize",w:"w-resize",e:"e-resize",sw:"sw-resize",s:"s-resize",se:"se-resize"};
  const h=HANDLE_SIZE/2;
  const posCSS={nw:{top:-h,left:-h},n:{top:-h,left:"50%",transform:"translateX(-50%)"},ne:{top:-h,right:-h},w:{top:"50%",left:-h,transform:"translateY(-50%)"},e:{top:"50%",right:-h,transform:"translateY(-50%)"},sw:{bottom:-h,left:-h},s:{bottom:-h,left:"50%",transform:"translateX(-50%)"},se:{bottom:-h,right:-h}};
  return <div style={{position:"absolute",width:HANDLE_SIZE,height:HANDLE_SIZE,background:accent||"#8b4513",border:"2px solid #fff",borderRadius:2,cursor:cursors[position],zIndex:10,boxShadow:"0 1px 4px #0004",...(posCSS[position]||{})}} onMouseDown={e=>{e.stopPropagation();onMouseDown(e,position);}}/>;
}

function ImageContextMenu({ x, y, image, onClose, onDelete, onOpenProperties, onWrapChange, theme }) {
  const ref=useRef(null);
  useEffect(()=>{
    function h(e){if(ref.current&&!ref.current.contains(e.target))onClose();}
    function onKey(e){if(e.key==="Escape")onClose();}
    document.addEventListener("mousedown",h);
    document.addEventListener("keydown",onKey);
    return()=>{document.removeEventListener("mousedown",h);document.removeEventListener("keydown",onKey);}
  },[onClose]);

  // คำนวณตำแหน่งไม่ให้เกิน viewport
  const menuW=210, menuH=240;
  const safeX = Math.min(x, window.innerWidth  - menuW - 8);
  const safeY = Math.min(y, window.innerHeight - menuH - 8);

  const t=theme||{}; const panel=t.panel||"#faf7f3", border=t.border||"#e8e0d5", ink=t.ink||"#1a1612", accent=t.accent||"#8b4513", accentLight=t.accentLight||"#8b451322";

  // ใช้ Portal เพื่อ render ตรงที่ document.body — หลุดพ้น overflow:hidden ทุก parent
  return createPortal(
    <div ref={ref} style={{position:"fixed",left:safeX,top:safeY,background:panel,border:`1px solid ${border}`,borderRadius:10,boxShadow:"0 8px 32px #0004",zIndex:99999,minWidth:menuW,padding:"4px 0",fontFamily:"'Sarabun',sans-serif",fontSize:13}}>
      <div style={{padding:"6px 16px 4px",fontSize:10,opacity:0.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em"}}>Wrap Text</div>
      {WRAP_MODES.map(mode=>(
        <button key={mode.id}
          style={{display:"block",width:"100%",padding:"7px 16px",background:image.wrapMode===mode.id?accentLight:"none",border:"none",textAlign:"left",fontSize:13,color:image.wrapMode===mode.id?accent:ink,fontWeight:image.wrapMode===mode.id?700:400,cursor:"pointer"}}
          onMouseEnter={e=>e.currentTarget.style.background=accentLight}
          onMouseLeave={e=>e.currentTarget.style.background=image.wrapMode===mode.id?accentLight:"none"}
          onClick={()=>{onWrapChange(image.id,mode.id);onClose();}}>
          {mode.icon} {mode.label}<span style={{fontSize:10,opacity:.55,marginLeft:8}}>{mode.desc}</span>
        </button>
      ))}
      <div style={{height:1,background:border,margin:"4px 0"}}/>
      <button style={{display:"block",width:"100%",padding:"7px 16px",background:"none",border:"none",textAlign:"left",fontSize:13,color:ink,cursor:"pointer"}}
        onMouseEnter={e=>e.currentTarget.style.background=accentLight}
        onMouseLeave={e=>e.currentTarget.style.background="none"}
        onClick={()=>{onOpenProperties(image.id);onClose();}}>⚙️ Image Properties…</button>
      <div style={{height:1,background:border,margin:"4px 0"}}/>
      <button style={{display:"block",width:"100%",padding:"7px 16px",background:"none",border:"none",textAlign:"left",fontSize:13,color:"#dc2626",cursor:"pointer"}}
        onMouseEnter={e=>e.currentTarget.style.background="#dc262611"}
        onMouseLeave={e=>e.currentTarget.style.background="none"}
        onClick={()=>{onDelete(image.id);onClose();}}>🗑 Delete Image</button>
    </div>,
    document.body
  );
}

function ImageUploadDropzone({ onUpload, accent, border, panel }) {
  const [over,setOver]=useState(false); const ref=useRef(null);
  function readFile(file){const r=new FileReader();r.onload=ev=>onUpload(ev.target.result,file.name);r.readAsDataURL(file);}
  return (
    <div style={{width:"100%",height:"100%",minHeight:120,border:`2px dashed ${over?accent:border}`,borderRadius:8,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,background:over?`${accent}11`:panel,cursor:"pointer",transition:".15s"}}
      onClick={()=>ref.current?.click()} onDragOver={e=>{e.preventDefault();setOver(true);}} onDragLeave={()=>setOver(false)}
      onDrop={e=>{e.preventDefault();setOver(false);const f=e.dataTransfer.files?.[0];if(f&&f.type.startsWith("image/"))readFile(f);}}>
      <div style={{fontSize:28,opacity:.4}}>🖼</div>
      <div style={{fontSize:12,opacity:.55,textAlign:"center",lineHeight:1.5}}>Click to upload or<br/>drop image here</div>
      <input ref={ref} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f)readFile(f);e.target.value="";}}/>
    </div>
  );
}

function ImageBlock({ image, onUpdate, onDelete, onSelect, selected, onOpenProperties, theme, readOnly=false }) {
  const [contextMenu,setContextMenu]=useState(null);
  const [isDragging,setIsDragging]=useState(false);
  const [isResizing,setIsResizing]=useState(false);
  const dragStart=useRef(null), resizeStart=useRef(null), containerRef=useRef(null);
  const accent=theme?.accent||"#8b4513", border=theme?.border||"#e8e0d5", panel=theme?.panel||"#faf7f3";
  const wrapMode=image.wrapMode||"inline", alignment=image.alignment||"left";
  const isAbsolute=wrapMode==="behind_text"||wrapMode==="in_front";
  const w=image.width||240, h=image.height||180;

  function getContainerStyle(){
    const base={position:"relative",display:"inline-block",outline:selected?`2px solid ${accent}`:"none",outlineOffset:2,borderRadius:image.borderRadius||0,overflow:"visible",transition:"outline .1s",userSelect:"none"};
    if(wrapMode==="inline") return {...base,display:"block",width:alignment==="center"?"fit-content":w,maxWidth:"100%",margin:alignment==="center"?"12px auto":alignment==="right"?"12px 0 12px auto":"12px 0"};
    if(wrapMode==="square"||wrapMode==="tight") return {...base,float:alignment==="right"?"right":"left",width:w,margin:alignment==="right"?"4px 0 8px 16px":"4px 16px 8px 0",shapeOutside:wrapMode==="tight"?"content-box":undefined,shapeMargin:wrapMode==="tight"?"4px":undefined};
    if(wrapMode==="behind_text") return {...base,position:"absolute",width:w,height:h,left:image.x||0,top:image.y||0,zIndex:0,margin:0,cursor:readOnly?"default":"move"};
    if(wrapMode==="in_front") return {...base,position:"absolute",width:w,height:h,left:image.x||0,top:image.y||0,zIndex:100,margin:0,cursor:readOnly?"default":"move"};
    return base;
  }
  function getImageStyle(){
    const rot = image.rotation||0;
    const filters=[
      image.brightness!==undefined ? `brightness(${image.brightness}%)` : "",
      image.contrast!==undefined   ? `contrast(${image.contrast}%)`     : "",
      image.grayscale               ? "grayscale(100%)"                  : "",
    ].filter(Boolean).join(" ")||undefined;
    return {
      display:"block",
      width:isAbsolute?"100%":w,
      height:isAbsolute?"100%":h,
      objectFit:image.objectFit||"cover",
      borderRadius:image.borderRadius||0,
      opacity:image.opacity!==undefined?image.opacity:1,
      filter:filters,
      transform: rot ? `rotate(${rot}deg)` : undefined,
      transformOrigin:"center center",
      pointerEvents:readOnly?"none":"auto",
    };
  }

  function handleMouseDownDrag(e){if(readOnly||!isAbsolute||e.button!==0)return;e.preventDefault();e.stopPropagation();onSelect?.(image.id);setIsDragging(true);dragStart.current={mx:e.clientX,my:e.clientY,ox:image.x||0,oy:image.y||0};}
  useEffect(()=>{if(!isDragging)return;function onMove(e){const{mx,my,ox,oy}=dragStart.current;onUpdate(image.id,{x:Math.max(0,ox+e.clientX-mx),y:Math.max(0,oy+e.clientY-my)});}function onUp(){setIsDragging(false);}document.addEventListener("mousemove",onMove);document.addEventListener("mouseup",onUp);return()=>{document.removeEventListener("mousemove",onMove);document.removeEventListener("mouseup",onUp);};},[isDragging]);

  function handleResizeMouseDown(e,handle){if(readOnly)return;e.preventDefault();e.stopPropagation();setIsResizing(true);resizeStart.current={mx:e.clientX,my:e.clientY,w:image.width||240,h:image.height||180,x:image.x||0,y:image.y||0,handle};}
  useEffect(()=>{if(!isResizing)return;function onMove(e){const{mx,my,w,h,x,y,handle}=resizeStart.current;const dx=e.clientX-mx,dy=e.clientY-my;let nW=w,nH=h,nX=x,nY=y;if(handle.includes("e"))nW=Math.max(MIN_IW,w+dx);if(handle.includes("s"))nH=Math.max(MIN_IH,h+dy);if(handle.includes("w")){nW=Math.max(MIN_IW,w-dx);nX=x+(w-nW);}if(handle.includes("n")){nH=Math.max(MIN_IH,h-dy);nY=y+(h-nH);}if(e.shiftKey&&image.src){const asp=w/h;if(Math.abs(dx)>Math.abs(dy))nH=Math.round(nW/asp);else nW=Math.round(nH*asp);}const patch={width:Math.round(nW),height:Math.round(nH)};if(isAbsolute){patch.x=Math.max(0,Math.round(nX));patch.y=Math.max(0,Math.round(nY));}onUpdate(image.id,patch);}function onUp(){setIsResizing(false);}document.addEventListener("mousemove",onMove);document.addEventListener("mouseup",onUp);return()=>{document.removeEventListener("mousemove",onMove);document.removeEventListener("mouseup",onUp);};},[isResizing]);

  const HANDLES=["nw","n","ne","w","e","sw","s","se"];
  return (
    <>
      <div ref={containerRef} style={getContainerStyle()} onClick={e=>{e.stopPropagation();onSelect?.(image.id);}} onDoubleClick={e=>{e.stopPropagation();if(!readOnly)onOpenProperties?.(image.id);}} onContextMenu={e=>{if(readOnly)return;e.preventDefault();e.stopPropagation();setContextMenu({x:e.clientX,y:e.clientY});}} onMouseDown={isAbsolute?handleMouseDownDrag:undefined} data-image-id={image.id} data-wrap-mode={wrapMode}>
        {image.src?(<img src={image.src} alt={image.alt||""} style={getImageStyle()} draggable={false}/>):(<ImageUploadDropzone onUpload={(dataUrl,fileName)=>onUpdate(image.id,{src:dataUrl,alt:fileName})} accent={accent} border={border} panel={panel}/>)}
        {image.caption&&<div style={{textAlign:"center",fontSize:11,opacity:.6,marginTop:4,fontStyle:"italic",lineHeight:1.4}}>{image.caption}</div>}
        {selected&&!readOnly&&<div style={{position:"absolute",inset:-2,border:`2px solid ${accent}`,borderRadius:image.borderRadius||0,pointerEvents:"none",zIndex:5}}/>}
        {selected&&!readOnly&&image.src&&HANDLES.map(handle=><ResizeHandle key={handle} position={handle} onMouseDown={handleResizeMouseDown} accent={accent}/>)}
        {selected&&isAbsolute&&!readOnly&&<div style={{position:"absolute",top:4,left:4,background:`${accent}cc`,color:"#fff",fontSize:10,padding:"2px 6px",borderRadius:4,pointerEvents:"none",zIndex:20,fontFamily:"monospace"}}>⠿ drag · {w}×{h}{image.rotation?` · ${image.rotation}°`:""}</div>}
        {selected&&!readOnly&&<div style={{position:"absolute",bottom:-20,left:0,background:accent,color:"#fff",fontSize:9,padding:"1px 6px",borderRadius:"0 0 4px 4px",pointerEvents:"none",whiteSpace:"nowrap",zIndex:20}}>{WRAP_MODES.find(m=>m.id===wrapMode)?.icon} {WRAP_MODES.find(m=>m.id===wrapMode)?.label}</div>}
      </div>
      {contextMenu&&<ImageContextMenu x={contextMenu.x} y={contextMenu.y} image={image} theme={theme} onClose={()=>setContextMenu(null)} onDelete={onDelete} onOpenProperties={onOpenProperties} onWrapChange={(id,mode)=>onUpdate(id,{wrapMode:mode})}/>}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// IMAGE PROPERTIES PANEL  (inlined from ImagePropertiesPanel.jsx)
// ═══════════════════════════════════════════════════════════════════════════════

function IPPSection({ title, children, defaultOpen=true, accent, border }) {
  const [open,setOpen]=useState(defaultOpen);
  return (
    <div style={{marginBottom:0}}>
      <button onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",background:"none",border:"none",padding:"9px 14px",cursor:"pointer",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",opacity:.6,color:"inherit",borderBottom:`1px solid ${border}`}}>
        {title}<span style={{fontSize:9,opacity:.7}}>{open?"▲":"▼"}</span>
      </button>
      {open&&<div style={{padding:"12px 14px",borderBottom:`1px solid ${border}`}}>{children}</div>}
    </div>
  );
}
function IPPSlider({ label, value, min, max, step=1, unit="", onChange, accent }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
      <label style={{fontSize:11,opacity:.65,width:90,flexShrink:0}}>{label}</label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))} style={{flex:1,accentColor:accent}}/>
      <span style={{fontSize:11,opacity:.8,width:40,textAlign:"right",flexShrink:0}}>{value}{unit}</span>
    </div>
  );
}
function IPPNumber({ label, value, min, max, step=1, unit="px", onChange, accent, border, ink }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
      <label style={{fontSize:11,opacity:.65,width:90,flexShrink:0}}>{label}</label>
      <input type="number" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))} style={{flex:1,padding:"4px 8px",border:`1px solid ${border}`,borderRadius:6,background:`${border}33`,color:ink,fontSize:12,outline:"none"}}/>
      <span style={{fontSize:11,opacity:.5,width:24}}>{unit}</span>
    </div>
  );
}
function IPPToggle({ active, onClick, children, accent }) {
  return <button onClick={onClick} style={{padding:"5px 10px",border:`1.5px solid ${active?accent:"transparent"}`,borderRadius:6,background:active?`${accent}18`:"transparent",color:active?accent:"inherit",fontSize:12,fontWeight:active?700:400,cursor:"pointer",transition:".12s"}}>{children}</button>;
}

const ImagePropertiesPanel = memo(function ImagePropertiesPanel({ image, onUpdate, onDelete, onClose, theme, standalone=true }) {
  const [lockAspect,setLockAspect]=useState(false);
  const [aspectRatio]=useState(()=>image?.width&&image?.height?image.width/image.height:16/9);
  const accent=theme?.accent||"#8b4513", border=theme?.border||"#e8e0d5", panel=theme?.panel||"#faf7f3", ink=theme?.ink||"#1a1612";
  const upd=useCallback(patch=>{if(!image)return;onUpdate(image.id,patch);},[image,onUpdate]);
  function setW(val){const w=Math.max(60,val);upd(lockAspect?{width:w,height:Math.round(w/aspectRatio)}:{width:w});}
  function setH(val){const h=Math.max(40,val);upd(lockAspect?{height:h,width:Math.round(h*aspectRatio)}:{height:h});}

  if(!image) return <div style={{padding:24,textAlign:"center",opacity:.45,fontSize:13,fontStyle:"italic"}}>No image selected.<br/>Click an image to edit its properties.</div>;
  const isAbs=image.wrapMode==="behind_text"||image.wrapMode==="in_front";
  const panelStyle=standalone?{position:"fixed",right:16,top:60,width:280,background:panel,border:`1px solid ${border}`,borderRadius:14,boxShadow:"0 12px 48px #0003",zIndex:1500,overflow:"hidden",maxHeight:"calc(100vh - 80px)",overflowY:"auto",fontFamily:"inherit",color:ink}:{width:"100%",background:panel,borderRadius:10,border:`1px solid ${border}`,overflow:"hidden",color:ink};

  return (
    <div style={panelStyle}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderBottom:`1px solid ${border}`,background:`${border}22`,position:"sticky",top:0,zIndex:5}}>
        <div style={{fontWeight:800,fontSize:13,display:"flex",alignItems:"center",gap:8}}>🖼 Image Properties</div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>{if(window.confirm("Delete this image?"))onDelete(image.id);}} style={{padding:"3px 8px",border:"none",background:"#dc262618",color:"#dc2626",borderRadius:6,fontSize:12,cursor:"pointer"}}>🗑</button>
          {standalone&&<button onClick={onClose} style={{padding:"3px 8px",border:`1px solid ${border}`,background:"transparent",color:ink,borderRadius:6,fontSize:12,cursor:"pointer",opacity:.7}}>×</button>}
        </div>
      </div>

      {image.src&&<div style={{padding:"10px 14px",borderBottom:`1px solid ${border}`}}><img src={image.src} alt="" style={{width:"100%",maxHeight:120,objectFit:"contain",borderRadius:6,border:`1px solid ${border}`,background:`${border}44`}}/></div>}

      <IPPSection title="Layout & Wrap" accent={accent} border={border}>
        <div style={{marginBottom:10}}>
          <div style={{fontSize:11,opacity:.55,marginBottom:6}}>Wrap Mode</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
            {WRAP_MODES.map(mode=>(
              <button key={mode.id} onClick={()=>upd({wrapMode:mode.id})} title={mode.desc} style={{padding:"6px 8px",border:`1.5px solid ${image.wrapMode===mode.id?accent:border}`,borderRadius:7,background:image.wrapMode===mode.id?`${accent}18`:"transparent",color:image.wrapMode===mode.id?accent:ink,cursor:"pointer",fontSize:12,fontWeight:image.wrapMode===mode.id?700:400,textAlign:"left",transition:".12s"}}>
                {mode.icon} {mode.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{fontSize:11,opacity:.55,marginBottom:6}}>Alignment</div>
          <div style={{display:"flex",gap:5}}>
            {ALIGN_OPTIONS.map(opt=><IPPToggle key={opt.id} active={image.alignment===opt.id} onClick={()=>upd({alignment:opt.id})} accent={accent}>{opt.icon} {opt.label}</IPPToggle>)}
          </div>
        </div>
      </IPPSection>

      <IPPSection title="Size & Position" accent={accent} border={border}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{flex:1}}>
            <IPPNumber label="Width" value={image.width||240} min={60} max={2000} unit="px" onChange={setW} accent={accent} border={border} ink={ink}/>
            <IPPNumber label="Height" value={image.height||180} min={40} max={2000} unit="px" onChange={setH} accent={accent} border={border} ink={ink}/>
          </div>
          <button onClick={()=>setLockAspect(v=>!v)} title="Lock aspect ratio" style={{width:28,height:54,border:`1.5px solid ${lockAspect?accent:border}`,background:lockAspect?`${accent}18`:"transparent",borderRadius:6,cursor:"pointer",color:lockAspect?accent:ink,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{lockAspect?"🔒":"🔓"}</button>
        </div>
        {isAbs&&<>
          <IPPNumber label="X Position" value={image.x||0} min={0} max={2000} unit="px" onChange={v=>upd({x:v})} accent={accent} border={border} ink={ink}/>
          <IPPNumber label="Y Position" value={image.y||0} min={0} max={2000} unit="px" onChange={v=>upd({y:v})} accent={accent} border={border} ink={ink}/>
        </>}
      </IPPSection>

      <IPPSection title="Adjustments" accent={accent} border={border} defaultOpen={true}>
        <IPPSlider label="Brightness" value={image.brightness!==undefined?image.brightness:100} min={0} max={200} unit="%" onChange={v=>upd({brightness:v})} accent={accent}/>
        <IPPSlider label="Contrast"   value={image.contrast!==undefined?image.contrast:100}     min={0} max={200} unit="%" onChange={v=>upd({contrast:v})}   accent={accent}/>
        <IPPSlider label="Opacity"    value={Math.round((image.opacity!==undefined?image.opacity:1)*100)} min={0} max={100} unit="%" onChange={v=>upd({opacity:v/100})} accent={accent}/>
        <IPPSlider label="Rotation"   value={image.rotation||0} min={0} max={359} unit="°"  onChange={v=>upd({rotation:v})} accent={accent}/>
        {/* Quick rotate buttons */}
        <div style={{display:"flex",gap:5,marginBottom:8}}>
          {[0,90,180,270].map(deg=>(
            <button key={deg} onClick={()=>upd({rotation:deg})}
              style={{flex:1,padding:"4px 0",border:`1px solid ${(image.rotation||0)===deg?accent:border}`,borderRadius:6,background:(image.rotation||0)===deg?`${accent}22`:"transparent",color:(image.rotation||0)===deg?accent:ink,fontSize:10,cursor:"pointer",fontWeight:(image.rotation||0)===deg?700:400}}>
              {deg}°
            </button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
          <input type="checkbox" id="ipp-grayscale" checked={!!image.grayscale} onChange={e=>upd({grayscale:e.target.checked})} style={{accentColor:accent}}/>
          <label htmlFor="ipp-grayscale" style={{fontSize:12,cursor:"pointer"}}>Grayscale</label>
          <button onClick={()=>upd({brightness:100,contrast:100,opacity:1,grayscale:false,rotation:0})} style={{marginLeft:"auto",fontSize:10,opacity:.5,background:"none",border:"none",cursor:"pointer",color:ink}}>Reset</button>
        </div>
      </IPPSection>

      <IPPSection title="Border & Style" accent={accent} border={border} defaultOpen={false}>
        <IPPSlider label="Corner Radius" value={image.borderRadius||0} min={0} max={64} unit="px" onChange={v=>upd({borderRadius:v})} accent={accent}/>
        <div style={{marginBottom:10}}>
          <div style={{fontSize:11,opacity:.55,marginBottom:6}}>Object Fit</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {["cover","contain","fill","none"].map(fit=><IPPToggle key={fit} active={(image.objectFit||"cover")===fit} onClick={()=>upd({objectFit:fit})} accent={accent}>{fit}</IPPToggle>)}
          </div>
        </div>
      </IPPSection>

      <IPPSection title="Alt Text & Caption" accent={accent} border={border} defaultOpen={false}>
        <div style={{marginBottom:10}}>
          <label style={{fontSize:11,opacity:.55,display:"block",marginBottom:4}}>Alt Text (accessibility)</label>
          <textarea value={image.alt||""} onChange={e=>upd({alt:e.target.value})} placeholder="Describe the image…" rows={2} style={{width:"100%",padding:"6px 8px",border:`1px solid ${border}`,borderRadius:6,background:`${border}33`,color:ink,fontSize:12,resize:"vertical",outline:"none",lineHeight:1.5}}/>
        </div>
        <div>
          <label style={{fontSize:11,opacity:.55,display:"block",marginBottom:4}}>Caption</label>
          <input value={image.caption||""} onChange={e=>upd({caption:e.target.value})} placeholder="Figure 1: …" style={{width:"100%",padding:"6px 8px",border:`1px solid ${border}`,borderRadius:6,background:`${border}33`,color:ink,fontSize:12,outline:"none"}}/>
        </div>
      </IPPSection>

      <IPPSection title="Export Metadata" accent={accent} border={border} defaultOpen={false}>
        <div style={{fontSize:11,opacity:.55,marginBottom:10,lineHeight:1.5}}>Controls how this image appears in PDF and EPUB exports.</div>
        <div style={{marginBottom:12}}>
          <div style={{fontSize:11,fontWeight:700,marginBottom:6,color:accent}}>PDF</div>
          <label style={{fontSize:11,opacity:.55,display:"block",marginBottom:4}}>PDF Alt Text</label>
          <input value={image.exportMeta?.pdfAlt||image.alt||""} onChange={e=>upd({exportMeta:{...image.exportMeta,pdfAlt:e.target.value}})} placeholder="Same as alt text if empty" style={{width:"100%",padding:"5px 8px",border:`1px solid ${border}`,borderRadius:6,background:`${border}33`,color:ink,fontSize:12,outline:"none",marginBottom:8}}/>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <input type="checkbox" id="ipp-pdfDec" checked={!!image.exportMeta?.pdfDecorative} onChange={e=>upd({exportMeta:{...image.exportMeta,pdfDecorative:e.target.checked}})} style={{accentColor:accent}}/>
            <label htmlFor="ipp-pdfDec" style={{fontSize:12,cursor:"pointer"}}>Decorative (no alt text in PDF)</label>
          </div>
        </div>
        <div>
          <div style={{fontSize:11,fontWeight:700,marginBottom:6,color:accent}}>EPUB</div>
          <label style={{fontSize:11,opacity:.55,display:"block",marginBottom:4}}>EPUB Role</label>
          <select value={image.exportMeta?.epubRole||"doc-cover"} onChange={e=>upd({exportMeta:{...image.exportMeta,epubRole:e.target.value}})} style={{width:"100%",padding:"5px 8px",border:`1px solid ${border}`,borderRadius:6,background:`${border}33`,color:ink,fontSize:12,outline:"none",marginBottom:8}}>
            <option value="doc-cover">Cover image</option>
            <option value="doc-illustration">Illustration</option>
            <option value="doc-figure">Figure with caption</option>
            <option value="presentation">Presentation / decorative</option>
            <option value="none">None</option>
          </select>
          <label style={{fontSize:11,opacity:.55,display:"block",marginBottom:4}}>EPUB Landmark</label>
          <select value={image.exportMeta?.epubLandmark||""} onChange={e=>upd({exportMeta:{...image.exportMeta,epubLandmark:e.target.value}})} style={{width:"100%",padding:"5px 8px",border:`1px solid ${border}`,borderRadius:6,background:`${border}33`,color:ink,fontSize:12,outline:"none",marginBottom:8}}>
            <option value="">None</option>
            <option value="cover">Cover</option>
            <option value="frontmatter">Front matter</option>
            <option value="bodymatter">Body matter</option>
            <option value="backmatter">Back matter</option>
          </select>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <input type="checkbox" id="ipp-epubSpine" checked={image.exportMeta?.epubInSpine!==false} onChange={e=>upd({exportMeta:{...image.exportMeta,epubInSpine:e.target.checked}})} style={{accentColor:accent}}/>
            <label htmlFor="ipp-epubSpine" style={{fontSize:12,cursor:"pointer"}}>Include in EPUB spine</label>
          </div>
        </div>
      </IPPSection>

      {image.src&&<div style={{padding:"10px 14px",fontSize:10,opacity:.45,lineHeight:1.7}}>ID: {image.id}<br/>Mode: {image.wrapMode||"inline"} · {image.width||240}×{image.height||180}px{image.exportMeta?.epubRole&&` · EPUB: ${image.exportMeta.epubRole}`}</div>}
    </div>
  );
}
);

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const LAYOUT_SIZES = {
  a4:     { w:210, h:297, label:"A4",     px:{ w:794, h:1123 } },
  a5:     { w:148, h:210, label:"A5",     px:{ w:559, h:794  } },
  a5plus: { w:155, h:216, label:"A5+",    px:{ w:586, h:817  } },
  b5:     { w:176, h:250, label:"B5",     px:{ w:665, h:945  } },
  pocket: { w:130, h:188, label:"Pocket", px:{ w:491, h:711  } },
  "6x9":  { w:152, h:229, label:"6×9",    px:{ w:575, h:866  } },
  square: { w:148, h:148, label:"Square", px:{ w:559, h:559  } },
  kindle: { w:130, h:195, label:"Kindle", px:{ w:491, h:737  } },
  web:    { w:160, h:240, label:"Web",    px:{ w:605, h:907  } },
};

const FONTS = ["Sarabun","Noto Serif Thai","Kanit","Prompt","Mitr","Charm","Lora","Merriweather"];

const THEMES = {
  white: { bg:"#fffef9", ink:"#1a1612", sidebar:"#eeeae3", panel:"#f0ebe3", border:"#d8cfc2", accent:"#8b4513", accentLight:"#8b451322" },
  sepia: { bg:"#f5ede0", ink:"#2a1f0f", sidebar:"#ede0ce", panel:"#f0e4d0", border:"#d4c4a8", accent:"#7a3b10", accentLight:"#7a3b1022" },
  dark:  { bg:"#1a1612", ink:"#e8e0d5", sidebar:"#141210", panel:"#1f1c18", border:"#2e2a25", accent:"#c4773a", accentLight:"#c4773a22" },
};

const DIVIDERS = ["—", "◆◆◆", "❦", "✦✦✦", "* * *", "···", "⁂", "~ ~ ~", "✿✿✿", "❧ ❧ ❧", "§", "☙ ❧", "⊱ ── ⊰", "◈", "〰〰〰"];

// SVG Ornaments for scene dividers
const SVG_ORNAMENTS = [
  { id:"floral_vine", label:"เถาวัลย์ดอกไม้",
    svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 40" fill="none">
      <path d="M10 20 Q40 5 70 20 Q100 35 130 20 Q160 5 190 20 Q220 35 250 20 Q280 5 290 20" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <circle cx="150" cy="20" r="5" fill="currentColor" opacity="0.5"/>
      <circle cx="150" cy="20" r="9" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
      <path d="M130 20 Q140 10 150 20 Q160 10 170 20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7"/>
      <circle cx="70" cy="20" r="3" fill="currentColor" opacity="0.4"/>
      <circle cx="230" cy="20" r="3" fill="currentColor" opacity="0.4"/>
    </svg>` },
  { id:"royal_border", label:"ลายราชสำนัก",
    svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 36" fill="none">
      <line x1="10" y1="18" x2="105" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <line x1="195" y1="18" x2="290" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <polygon points="150,6 158,14 154,14 154,26 146,26 146,14 142,14" fill="currentColor" opacity="0.5"/>
      <rect x="118" y="16" width="16" height="4" rx="2" fill="currentColor" opacity="0.35"/>
      <rect x="166" y="16" width="16" height="4" rx="2" fill="currentColor" opacity="0.35"/>
      <polygon points="150,12 156,18 150,24 144,18" fill="currentColor" opacity="0.35"/>
      <circle cx="105" cy="18" r="3" fill="currentColor" opacity="0.4"/>
      <circle cx="195" cy="18" r="3" fill="currentColor" opacity="0.4"/>
    </svg>` },
  { id:"lotus", label:"ดอกบัว",
    svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 44" fill="none">
      <line x1="10" y1="22" x2="120" y2="22" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
      <line x1="180" y1="22" x2="290" y2="22" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
      <ellipse cx="150" cy="22" rx="6" ry="10" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
      <ellipse cx="138" cy="24" rx="5" ry="8" stroke="currentColor" strokeWidth="1" opacity="0.45" transform="rotate(-20 138 24)"/>
      <ellipse cx="162" cy="24" rx="5" ry="8" stroke="currentColor" strokeWidth="1" opacity="0.45" transform="rotate(20 162 24)"/>
      <ellipse cx="128" cy="27" rx="4" ry="6" stroke="currentColor" strokeWidth="0.8" opacity="0.3" transform="rotate(-35 128 27)"/>
      <ellipse cx="172" cy="27" rx="4" ry="6" stroke="currentColor" strokeWidth="0.8" opacity="0.3" transform="rotate(35 172 27)"/>
      <circle cx="150" cy="33" r="3" fill="currentColor" opacity="0.3"/>
    </svg>` },
  { id:"celtic_knot", label:"Celtic Knot",
    svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 32" fill="none">
      <line x1="10" y1="16" x2="126" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.45"/>
      <line x1="174" y1="16" x2="290" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.45"/>
      <path d="M134 8 Q142 8 142 16 Q142 24 150 24 Q158 24 158 16 Q158 8 166 8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.65"/>
      <path d="M134 24 Q142 24 142 16 Q142 8 150 8 Q158 8 158 16 Q158 24 166 24" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.45"/>
      <circle cx="126" cy="16" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="174" cy="16" r="2" fill="currentColor" opacity="0.4"/>
    </svg>` },
  { id:"art_deco", label:"Art Déco",
    svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 36" fill="none">
      <line x1="10" y1="18" x2="290" y2="18" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      <rect x="130" y="10" width="4" height="16" fill="currentColor" opacity="0.5"/>
      <rect x="138" y="13" width="4" height="10" fill="currentColor" opacity="0.4"/>
      <rect x="146" y="8" width="8" height="20" fill="currentColor" opacity="0.55"/>
      <rect x="158" y="13" width="4" height="10" fill="currentColor" opacity="0.4"/>
      <rect x="166" y="10" width="4" height="16" fill="currentColor" opacity="0.5"/>
      <line x1="10" y1="14" x2="125" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.35"/>
      <line x1="10" y1="22" x2="125" y2="22" stroke="currentColor" strokeWidth="0.8" opacity="0.35"/>
      <line x1="175" y1="14" x2="290" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.35"/>
      <line x1="175" y1="22" x2="290" y2="22" stroke="currentColor" strokeWidth="0.8" opacity="0.35"/>
    </svg>` },
  { id:"feather", label:"ขนนก",
    svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 40" fill="none">
      <line x1="10" y1="20" x2="135" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <line x1="165" y1="20" x2="290" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <path d="M150 8 Q165 14 162 28 Q155 22 150 30 Q145 22 138 28 Q135 14 150 8Z" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.55"/>
      <line x1="150" y1="8" x2="150" y2="32" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
      <path d="M140 16 Q150 14 160 16" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.35"/>
      <path d="M138 21 Q150 18 162 21" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.35"/>
    </svg>` },
  { id:"simple_line", label:"เส้นเรียบ",
    svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 20" fill="none">
      <line x1="10" y1="10" x2="290" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <line x1="10" y1="13" x2="290" y2="13" stroke="currentColor" strokeWidth="0.4" opacity="0.25"/>
    </svg>` },
  { id:"diamond_chain", label:"เพชรสาย",
    svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 24" fill="none">
      <line x1="10" y1="12" x2="290" y2="12" stroke="currentColor" strokeWidth="0.6" opacity="0.3"/>
      ${[30,60,90,120,150,180,210,240,270].map(x=>`<polygon points="${x},6 ${x+8},12 ${x},18 ${x-8},12" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.45"/>`).join("")}
    </svg>` },
  { id:"wave_ornament", label:"คลื่น",
    svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 28" fill="none">
      <path d="M0 14 C20 6 40 22 60 14 C80 6 100 22 120 14 C140 6 160 22 180 14 C200 6 220 22 240 14 C260 6 280 22 300 14" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M0 18 C20 10 40 26 60 18 C80 10 100 26 120 18 C140 10 160 26 180 18 C200 10 220 26 240 18 C260 10 280 26 300 18" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.25"/>
    </svg>` },
];

const COVER_TEMPLATES = {
  dark:       { bg:"linear-gradient(160deg,#1a1210,#3d2010)", accent:"#8b4513" },
  navy:       { bg:"linear-gradient(160deg,#0a1628,#1a3a5c)", accent:"#1a3a5c" },
  forest:     { bg:"linear-gradient(160deg,#0d2016,#1e5c38)", accent:"#2d6a4f" },
  rose:       { bg:"linear-gradient(160deg,#2a0a14,#7a2040)", accent:"#922b21" },
  ivory:      { bg:"linear-gradient(160deg,#f5ede0,#ddd0bc)", accent:"#8b4513" },
  slate:      { bg:"linear-gradient(160deg,#1c1c24,#2e2e3a)", accent:"#6b2d8b" },
  anime_dark: { bg:"linear-gradient(160deg,#0e001e,#1a0040)", accent:"#7c3aed" },
  sakura:     { bg:"linear-gradient(160deg,#1a0010,#4a1030)", accent:"#e91e8c" },
  galaxy:     { bg:"linear-gradient(160deg,#020817,#1a0a2e)", accent:"#818cf8" },
  horror:     { bg:"linear-gradient(160deg,#000000,#1a0000)", accent:"#991b1b" },
  fantasy:    { bg:"linear-gradient(160deg,#1a1000,#3d2800)", accent:"#d97706" },
  ocean:      { bg:"linear-gradient(160deg,#001e3c,#003366)", accent:"#0ea5e9" },
};

const LAYOUT_PRESETS = {
  novel:    { fontSize:16, lineHeight:185, marginV:56, marginH:52, textAlign:"justify", dropCap:true,  font:"Sarabun",        label:"นิยาย" },
  romance:  { fontSize:16, lineHeight:200, marginV:60, marginH:56, textAlign:"justify", dropCap:true,  font:"Charm",          label:"โรแมนซ์" },
  fantasy:  { fontSize:14, lineHeight:180, marginV:52, marginH:48, textAlign:"justify", dropCap:false, font:"Noto Serif Thai", label:"แฟนตาซี" },
  thriller: { fontSize:13, lineHeight:170, marginV:44, marginH:40, textAlign:"justify", dropCap:false, font:"Sarabun",        label:"Thriller" },
  literary: { fontSize:16, lineHeight:210, marginV:64, marginH:64, textAlign:"justify", dropCap:true,  font:"Prompt",         label:"วรรณกรรม" },
  anime:    { fontSize:14, lineHeight:190, marginV:52, marginH:48, textAlign:"left",    dropCap:false, font:"Kanit",          label:"อนิเมะ" },
  yaoi:     { fontSize:14, lineHeight:205, marginV:58, marginH:54, textAlign:"justify", dropCap:false, font:"Charm",          label:"Y" },
  children: { fontSize:18, lineHeight:240, marginV:60, marginH:60, textAlign:"justify", dropCap:false, font:"Mitr",           label:"เด็ก" },
  horror:   { fontSize:13, lineHeight:165, marginV:48, marginH:44, textAlign:"justify", dropCap:false, font:"Noto Serif Thai", label:"สยอง" },
  wuxia:    { fontSize:14, lineHeight:180, marginV:52, marginH:48, textAlign:"justify", dropCap:false, font:"Noto Serif Thai", label:"กำลังภายใน" },
};

const STATUS_COLORS = { "มีชีวิต":"#22c55e", "เสียชีวิต":"#ef4444", "ไม่ทราบ":"#f59e0b", "หาย":"#8b5cf6" };
const CHAR_ROLES = ["นางเอก","พระเอก","ผู้ร้ายหลัก","พระรอง","นางรอง","ตัวละครรับเชิญ","ตัวประกอบ","อื่นๆ"];

const SPECIAL_PAGE_TYPES = [
  { id:"copyright",       icon:"©",  label:"Copyright",       labelTh:"ลิขสิทธิ์" },
  { id:"dedication",      icon:"💝", label:"Dedication",      labelTh:"อุทิศให้แก่" },
  { id:"acknowledgements",icon:"🙏", label:"Acknowledgements",labelTh:"กิตติกรรมประกาศ" },
  { id:"references",      icon:"📚", label:"References",      labelTh:"บรรณานุกรม" },
  { id:"preface",         icon:"📝", label:"Preface",         labelTh:"คำนำ" },
  { id:"appendix",        icon:"📎", label:"Appendix",        labelTh:"ภาคผนวก" },
  { id:"about_author",    icon:"👤", label:"About Author",    labelTh:"เกี่ยวกับผู้เขียน" },
  { id:"custom",          icon:"✏️", label:"Custom Page",     labelTh:"หน้าที่กำหนดเอง" },
];

const ASSET_CATEGORIES = ["ปกหน้า","ปกหลัง","ตัวละคร","สถานที่","ภาพประกอบ","อื่นๆ"];

// ─── AI PROXY HELPERS ────────────────────────────────────────────────────────
// Set PROXY_ENDPOINT to your backend URL, e.g. "/api/ai" or "https://your-server/ai"
// The backend should accept: POST {provider, model, messages, max_tokens}
// and forward to the respective AI API with the secret key stored server-side.
const PROXY_ENDPOINT = "/api/ai";

async function callAIViaProxy(provider, prompt) {
  const res = await fetch(PROXY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, prompt, max_tokens: 1500 }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Proxy error ${res.status}`);
  }
  const data = await res.json();
  return data.text || "ไม่ได้รับผล";
}



// Pure utility — hoisted outside component to avoid re-creation on every render
function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "");
}

function wordCount(txt) {
  if (!txt) return 0;
  const trimmed = stripHtml(txt).trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length <= 1 && trimmed.length > 20) return Math.round(trimmed.length / 5);
  return words.length;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔥 WRITING STREAK — localStorage helpers
// ═══════════════════════════════════════════════════════════════════════════════

const STREAK_KEY   = "nfa_streak_data";

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function loadStreakData() {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw);
  } catch(_) {}
  return { streak: 0, lastDate: "", longestStreak: 0, totalDaysWritten: 0 };
}

function saveStreakData(data) {
  try { localStorage.setItem(STREAK_KEY, JSON.stringify(data)); } catch(_) {}
}

// เรียกเมื่อ user พิมพ์ถึง goal วันนี้
function markStreakToday() {
  const today = getTodayStr();
  const data   = loadStreakData();
  if (data.lastDate === today) return data; // already counted today

  const yesterday = (() => {
    const d = new Date(); d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  })();

  const newStreak = (data.lastDate === yesterday) ? data.streak + 1 : 1;
  const updated = {
    streak:          newStreak,
    lastDate:        today,
    longestStreak:   Math.max(newStreak, data.longestStreak || 0),
    totalDaysWritten:(data.totalDaysWritten || 0) + 1,
  };
  saveStreakData(updated);
  return updated;
}

// ─── PAGINATED EDITOR ─────────────────────────────────────────────────────────
// แสดงเนื้อหาแบบแบ่งหน้าจริง เหมือน Word
// แต่ละหน้า = div แยก พอ content ล้นหน้า → สร้างหน้าใหม่อัตโนมัติ
// ─────────────────────────────────────────────────────────────────────────────

// ─── INTERACTIVE RULER ────────────────────────────────────────────────────────
// ลาก handle ปรับ marginH (ซ้าย/ขวา) และ firstLineIndent ได้โดยตรง
// width = page px width (already zoomed), marginH = px, firstLineIndent = em, fontSize = px
function Ruler({ width, marginH, firstLineIndent = 0, fontSize = 16, zoom = 1, theme, onMarginChange, onIndentChange }) {
  const RULER_H = 32;
  const rulerRef = useRef(null);
  const dragging = useRef(null); // "left" | "right" | "indent"

  // px → mm
  const pxToMm = px => Math.round(px / 3.78);
  // mm → label
  const mmLabel = px => pxToMm(px) + "";

  // indent in px (relative to left margin)
  const indentPx = firstLineIndent * fontSize;

  // tick marks
  const ticks = [];
  const totalMm = Math.round(width / 3.78);
  for (let mm = 0; mm <= totalMm; mm++) {
    const x = mm * 3.78;
    const isMajor = mm % 10 === 0;
    const isMid   = mm % 5 === 0;
    ticks.push({ mm, x, isMajor, isMid });
  }

  function getXFromEvent(e) {
    const rect = rulerRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    return clientX - rect.left;
  }

  function onMouseDown(handle, e) {
    e.preventDefault();
    dragging.current = handle;
    const moveHandler = (ev) => {
      const x = getXFromEvent(ev);
      if (dragging.current === "left") {
        // clamp 10..width/2
        const newPx = Math.max(10, Math.min(width / 2 - 20, x));
        onMarginChange?.(Math.round(newPx));
      } else if (dragging.current === "right") {
        const newPx = Math.max(10, Math.min(width / 2 - 20, width - x));
        onMarginChange?.(Math.round(newPx));
      } else if (dragging.current === "indent") {
        // indent relative to left margin
        const relX = x - marginH;
        const newEm = Math.max(0, Math.min(6, parseFloat((relX / fontSize).toFixed(2))));
        onIndentChange?.(newEm);
      }
    };
    const upHandler = () => {
      dragging.current = null;
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", upHandler);
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("touchend", upHandler);
    };
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", upHandler);
    window.addEventListener("touchmove", moveHandler, { passive: false });
    window.addEventListener("touchend", upHandler);
  }

  const accent = theme.accent;
  const ink    = theme.ink;
  const bg     = theme.panel;
  const border = theme.border;

  // indent handle position (absolute on ruler)
  const indentHandleX = marginH + indentPx;

  return (
    <div ref={rulerRef} style={{
      width, height: RULER_H, position:"relative", background: bg,
      borderBottom:`1px solid ${border}`, flexShrink:0,
      userSelect:"none", overflow:"visible", touchAction:"none",
    }}>
      {/* Tick marks + numbers */}
      <svg width={width} height={RULER_H} style={{display:"block",position:"absolute",top:0,left:0,pointerEvents:"none"}}>
        {/* Shaded margin zones */}
        <rect x={0} y={0} width={marginH} height={RULER_H} fill={accent} opacity={0.07}/>
        <rect x={width-marginH} y={0} width={marginH} height={RULER_H} fill={accent} opacity={0.07}/>

        {ticks.map(({ mm, x, isMajor, isMid }) => (
          <g key={mm}>
            <line x1={x} y1={isMajor ? 8 : isMid ? 13 : 17} x2={x} y2={RULER_H}
              stroke={border} strokeWidth={isMajor ? 1.2 : 0.7} opacity={isMajor ? 0.8 : 0.4}/>
            {isMajor && mm > 0 && (
              <text x={x + 2} y={12} fontSize={8} fill={ink} opacity={0.5} fontFamily="monospace">{mm}</text>
            )}
          </g>
        ))}
      </svg>

      {/* ── Left margin handle ── */}
      <div onMouseDown={e=>onMouseDown("left",e)} onTouchStart={e=>onMouseDown("left",e)}
        title={`Margin ซ้าย: ${mmLabel(marginH)} mm — ลากปรับ`}
        style={{
          position:"absolute", top:0, left: marginH - 8, width:16, height:RULER_H,
          cursor:"ew-resize", zIndex:10, display:"flex", alignItems:"center", justifyContent:"center",
        }}>
        <div style={{width:3, height:20, background:accent, borderRadius:3, opacity:.85, boxShadow:`0 0 4px ${accent}88`}}/>
        {/* triangle bottom */}
        <div style={{position:"absolute",bottom:2,left:"50%",transform:"translateX(-50%)",
          width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",
          borderTop:`6px solid ${accent}`}}/>
      </div>

      {/* ── Right margin handle ── */}
      <div onMouseDown={e=>onMouseDown("right",e)} onTouchStart={e=>onMouseDown("right",e)}
        title={`Margin ขวา: ${mmLabel(marginH)} mm — ลากปรับ`}
        style={{
          position:"absolute", top:0, left: width - marginH - 8, width:16, height:RULER_H,
          cursor:"ew-resize", zIndex:10, display:"flex", alignItems:"center", justifyContent:"center",
        }}>
        <div style={{width:3, height:20, background:accent, borderRadius:3, opacity:.85, boxShadow:`0 0 4px ${accent}88`}}/>
        <div style={{position:"absolute",bottom:2,left:"50%",transform:"translateX(-50%)",
          width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",
          borderTop:`6px solid ${accent}`}}/>
      </div>

      {/* ── First-line indent handle (triangle top) ── */}
      <div onMouseDown={e=>onMouseDown("indent",e)} onTouchStart={e=>onMouseDown("indent",e)}
        title={`First-line Indent: ${firstLineIndent} em — ลากปรับ`}
        style={{
          position:"absolute", top:0, left: indentHandleX - 7, width:14, height:14,
          cursor:"ew-resize", zIndex:11, display:"flex", alignItems:"flex-start", justifyContent:"center",
        }}>
        <div style={{
          width:0, height:0,
          borderLeft:"7px solid transparent", borderRight:"7px solid transparent",
          borderBottom:`10px solid ${ink}`, opacity:.7,
          filter:`drop-shadow(0 1px 2px ${accent}88)`,
        }}/>
      </div>

      {/* Tooltip label while interacting */}
      <div style={{position:"absolute",top:0,right:4,fontSize:9,opacity:.4,color:ink,pointerEvents:"none",lineHeight:"32px",fontFamily:"monospace"}}>
        ←{mmLabel(marginH)}mm · ↦{firstLineIndent}em→
      </div>
    </div>
  );
}

function PaginatedEditor({ chId, content, onChange, theme, settings, layoutSize, headerEl, footerEl, typewriterMode, paraFocusMode, editorScrollRef, insertTriggerRef }) {
  const pageH     = layoutSize.px.h;
  const marginV   = settings.marginV || 56;
  const marginH   = settings.marginH || 52;
  const contentH  = pageH - marginV * 2; // พื้นที่เนื้อหาต่อหน้า

  // pages = array ของ HTML string แต่ละหน้า
  const [pages, setPages] = useState([""]);
  const measureRef   = useRef(null); // hidden div สำหรับวัด
  const pagesRef     = useRef([]);
  const lastChIdRef  = useRef(chId);
  const debounceRef  = useRef(null);

  // ── Cursor-across-pages refs ──────────────────────────────────────────────
  // quillRefs[i].current = Quill instance ของหน้า i
  const quillRefs       = useRef([]);       // array ของ ref objects
  const activePageRef   = useRef(0);        // หน้าที่ user กำลังพิมพ์อยู่
  const [activeTypingPage, setActiveTypingPage] = useState(0); // state version สำหรับ render
  const pendingFocusRef = useRef(null);     // { pageIdx, position:"start"|"end" } รอ focus หลัง render
  const [insertPickerAt, setInsertPickerAt] = useState(null); // Insert-page picker

  // build CSS string for measuring
  const measureStyle = {
    position:"absolute", visibility:"hidden", pointerEvents:"none",
    width: layoutSize.px.w - marginH * 2,
    fontFamily:`'${settings.font}','Noto Serif Thai','Sarabun',sans-serif`,
    fontSize: settings.fontSize,
    lineHeight: settings.lineHeight / 100,
    wordBreak:"normal", overflowWrap:"anywhere",
    whiteSpace:"pre-wrap",
  };

  // แปลง HTML content เป็น array ของ paragraph nodes
  function getParas(html) {
    const div = document.createElement("div");
    div.innerHTML = plainToHtml(html);
    return Array.from(div.childNodes);
  }

  // วัดความสูงของ HTML string ใน hidden div
  function measureHeight(html) {
    const el = measureRef.current;
    if (!el) return 0;
    el.innerHTML = html;
    return el.scrollHeight;
  }

  // แบ่ง paragraphs ออกเป็น pages โดยใส่ทีละ para แล้ววัด
  function paginate(html) {
    const paras = getParas(html);
    const result = [];
    let currentParas = [];
    let currentHtml  = "";

    for (let i = 0; i < paras.length; i++) {
      const node   = paras[i];
      const paraHtml = node.outerHTML || node.textContent || "";
      const testHtml = currentHtml + paraHtml;
      const h = measureHeight(testHtml);

      if (h > contentH && currentParas.length > 0) {
        // flush current page
        result.push(currentHtml);
        currentParas = [node];
        currentHtml  = paraHtml;
      } else {
        currentParas.push(node);
        currentHtml = testHtml;
      }
    }
    // last page
    result.push(currentHtml || "<p></p>");
    return result.length > 0 ? result : ["<p></p>"];
  }

  // re-paginate (debounced 800ms) — คง cursor ของหน้าที่กำลังพิมพ์
  function triggerPaginate(html, fromPageIdx) {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const newPages = paginate(html);

      // บันทึก cursor position ของหน้าที่กำลังพิมพ์ก่อน re-render
      const typingPage = fromPageIdx ?? activePageRef.current;
      const qActive = quillRefs.current[typingPage]?.current;
      const savedSel = qActive ? qActive.getSelection() : null;

      // เก็บ content จริงจาก Quill ของหน้าที่ active ไว้ก่อน
      // เพื่อป้องกัน paginate overwrite content ที่ user พิมอยู่
      const activeHtml = qActive ? qActive.root.innerHTML : null;
      if (activeHtml && newPages[typingPage] !== undefined) {
        newPages[typingPage] = activeHtml;
      }

      setPages(newPages);
      pagesRef.current = newPages;

      // grow quillRefs array ให้พอกับจำนวนหน้าใหม่
      while (quillRefs.current.length < newPages.length) {
        quillRefs.current.push({ current: null });
      }

      // restore cursor หลัง render ถัดไป
      if (savedSel !== null) {
        pendingFocusRef.current = { pageIdx: typingPage, sel: savedSel };
      }
    }, 800);
  }

  // หลัง render ทุกครั้ง — restore cursor ถ้ามี pending
  useEffect(() => {
    if (!pendingFocusRef.current) return;
    const { pageIdx, sel } = pendingFocusRef.current;
    pendingFocusRef.current = null;
    const q = quillRefs.current[pageIdx]?.current;
    if (!q) return;
    // clamp sel.index ให้ไม่เกินความยาว content หน้าปัจจุบัน
    const maxLen = q.getLength() - 1;
    const clampedIdx = Math.min(sel.index, maxLen);
    q.setSelection(clampedIdx, sel.length, "silent");
    q.focus();
  });

  // ── Cross-page cursor: เมื่อพิมพ์จนล้นหน้า → focus หน้าถัดไป ─────────────
  function handlePageFull(pageIdx) {
    const nextIdx = pageIdx + 1;
    activePageRef.current = nextIdx;
    setActiveTypingPage(nextIdx);
    pendingFocusRef.current = { pageIdx: nextIdx, sel: { index: 0, length: 0 } };
  }

  // ── Cross-page cursor: ↑ / Backspace ที่ต้นหน้า → focus หน้าก่อนหน้า ─────
  function handleCursorAtTop(pageIdx, position) {
    if (pageIdx === 0) return;
    const prevIdx = pageIdx - 1;
    activePageRef.current = prevIdx;
    setActiveTypingPage(prevIdx);
    const qPrev = quillRefs.current[prevIdx]?.current;
    if (qPrev) {
      const endIdx = Math.max(0, qPrev.getLength() - 1);
      qPrev.setSelection(endIdx, 0, "silent");
      qPrev.focus();
    }
  }

  // ── เพิ่มหน้าว่างหลัง afterIdx แล้ว focus ทันที ──────────────────────────

  const PAGE_TEMPLATES = [
    {
      id: "blank",
      icon: "📄",
      label: "หน้าว่าง",
      desc: "เขียนข้อความได้เลย",
      html: "<p><br></p>",
    },
    {
      id: "textbox",
      icon: "🗒️",
      label: "กล่องข้อความลอย",
      desc: "text box มีกรอบ จัดตำแหน่งได้",
      html: `<div style="border:1.5px solid #aaa;border-radius:8px;padding:16px 20px;margin:24px auto;max-width:80%;min-height:80px;background:#fafafa;"><p style="margin:0;">ข้อความในกล่อง</p></div>`,
    },
    {
      id: "section",
      icon: "✦",
      label: "Section Break",
      desc: "คั่นตอนด้วย divider",
      html: `<div style="display:flex;align-items:center;gap:12px;margin:40px 0;"><div style="flex:1;height:1px;background:#ccc;"></div><span style="font-size:18px;opacity:.5;letter-spacing:.2em;">✦ ✦ ✦</span><div style="flex:1;height:1px;background:#ccc;"></div></div><p><br></p>`,
    },
    {
      id: "chapter",
      icon: "📖",
      label: "Chapter Title",
      desc: "หน้าชื่อบทใหม่",
      html: `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:60%;gap:12px;text-align:center;"><p style="font-size:11px;letter-spacing:.25em;opacity:.4;margin:0;text-transform:uppercase;">Chapter</p><h1 style="font-size:2em;font-weight:800;margin:0;">ชื่อบท</h1><div style="width:40px;height:2px;background:currentColor;opacity:.3;margin-top:8px;"></div></div><p><br></p>`,
    },
    {
      id: "image",
      icon: "🖼️",
      label: "หน้ารูปภาพ",
      desc: "รูปภาพเต็มหน้า + caption",
      html: `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:85%;gap:16px;"><div style="width:100%;height:320px;background:#f0f0f0;border:2px dashed #ccc;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:32px;color:#bbb;">🖼</div><p style="font-size:11px;opacity:.5;text-align:center;margin:0;font-style:italic;">คำบรรยายภาพ</p></div>`,
    },
  ];

  function handleInsertPage(afterIdx, templateId) {
    const tpl = PAGE_TEMPLATES.find(t => t.id === templateId) || PAGE_TEMPLATES[0];
    const current = [...pagesRef.current];
    current.splice(afterIdx + 1, 0, tpl.html);
    pagesRef.current = current;

    // grow + shift quillRefs slots
    while (quillRefs.current.length < current.length) {
      quillRefs.current.push({ current: null });
    }
    quillRefs.current.splice(afterIdx + 1, 0, { current: null });

    const newPageIdx = afterIdx + 1;
    activePageRef.current = newPageIdx;
    pendingFocusRef.current = { pageIdx: newPageIdx, sel: { index: 0, length: 0 } };

    setPages([...current]);
    onChange(chId, current.join(""));
    setInsertPickerAt(null);
  }

  // expose insertTriggerRef to parent — direct ref assignment, no useEffect needed
  if (insertTriggerRef) {
    insertTriggerRef.current = (tplId) => {
      if (tplId) handleInsertPage(pagesRef.current.length - 1, tplId);
      else setInsertPickerAt(pagesRef.current.length - 1);
    };
  }

  // init / chapter change
  useEffect(() => {
    // clear debounce เก่าทิ้ง — ป้องกัน paginate จากบทเก่า restore cursor ผิดหน้า
    clearTimeout(debounceRef.current);
    lastChIdRef.current = chId;
    activePageRef.current = 0;
    setActiveTypingPage(0);
    quillRefs.current = [];
    pendingFocusRef.current = null;
    // paginate ทันที (ไม่ debounce) สำหรับบทใหม่
    const newPages = paginate(content);
    setPages(newPages);
    pagesRef.current = newPages;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chId]);

  // content changed from outside (mic, replace-all)
  useEffect(() => {
    if (chId !== lastChIdRef.current) return;
    triggerPaginate(content);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  // เมื่อ page ใดเปลี่ยน → รวม content แล้ว re-paginate + fire onChange
  function handlePageChange(pageIdx, newHtml) {
    activePageRef.current = pageIdx; // อัปเดตหน้าที่กำลังพิมพ์
    setActiveTypingPage(pageIdx);    // อัปเดต state สำหรับ render (ป้องกัน stale ref)
    const updated = [...pagesRef.current];
    updated[pageIdx] = newHtml;
    pagesRef.current = updated;
    const combined = updated.join("");
    onChange(chId, combined);
    triggerPaginate(combined, pageIdx);
  }

  const pageStyle = {
    width:  layoutSize.px.w,
    height: pageH,
    overflow: "hidden",
    position: "relative",
    boxSizing: "border-box",
    padding: `${marginV}px ${marginH}px`,
    fontFamily:`'${settings.font}','Noto Serif Thai','Sarabun',sans-serif`,
    fontSize: settings.fontSize,
    lineHeight: settings.lineHeight / 100,
    background: theme.bg,
    color: theme.ink,
    boxShadow:"0 4px 32px #0002",
    marginBottom: 24,
  };

  // ดึงประโยคสุดท้ายของ HTML string (สำหรับ ghost text)
  function getLastSentence(html) {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || "";
    const trimmed = text.trimEnd();
    // เอาแค่ 60 ตัวอักษรสุดท้าย
    return trimmed.length > 60 ? "…" + trimmed.slice(-60) : trimmed;
  }

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      {/* Hidden measure div */}
      <div ref={measureRef} style={measureStyle} aria-hidden="true" />

      {pages.map((pageHtml, idx) => (
        <div key={idx}>
        {/* ── ปุ่ม + ระหว่างหน้า (hover) ────────────────────────────────────── */}
        {idx > 0 && (
          <div style={{
            display:"flex", alignItems:"center", gap:8,
            height:28, marginBottom:4, marginTop:-20,
            opacity:0, transition:"opacity .2s",
          }}
            onMouseEnter={e=>e.currentTarget.style.opacity=1}
            onMouseLeave={e=>e.currentTarget.style.opacity=0}
          >
            <div style={{flex:1, height:1, background:theme.border, opacity:.35}} />
            <button
              title="แทรกหน้าที่นี่"
              onClick={() => setInsertPickerAt(idx - 1)}
              style={{
                display:"flex", alignItems:"center", gap:4,
                padding:"3px 12px", border:`1.5px dashed ${theme.accent}`,
                borderRadius:20, background:`${theme.accent}11`,
                color:theme.accent, fontSize:11, fontWeight:700,
                cursor:"pointer", transition:".15s",
              }}>
              + แทรกหน้า
            </button>
            <div style={{flex:1, height:1, background:theme.border, opacity:.35}} />
          </div>
        )}
        <div className="page-for-export" style={{height:pageH,overflow:"hidden",marginBottom:24,position:"relative"}}>
          {/* Header — บทที่ / ชื่อบท เฉพาะหน้าแรก */}
          {idx === 0 && headerEl}

          {/* Ghost text — แสดงประโยคสุดท้ายของหน้าก่อน (เฉพาะหน้า 2 เป็นต้นไป) */}
          {idx > 0 && (() => {
            const lastLine = getLastSentence(pages[idx - 1]);
            if (!lastLine) return null;
            return (
              <div style={{
                paddingTop: 8,
                paddingBottom: 6,
                marginBottom: 8,
                borderBottom: `1px dashed ${theme.border}`,
                fontSize: settings.fontSize * 0.82,
                lineHeight: settings.lineHeight / 100,
                color: theme.ink,
                opacity: 0.28,
                fontFamily: `'${settings.font}','Noto Serif Thai','Sarabun',sans-serif`,
                pointerEvents: "none",
                userSelect: "none",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}>
                {lastLine}
              </div>
            );
          })()}

          {/* contentEditable สำหรับแต่ละหน้า */}
          <RichEditor
            chId={`${chId}-p${idx}`}
            content={pageHtml}
            onChange={(_, html) => handlePageChange(idx, html)}
            className={`editor${settings.dropCap && idx===0 ? " drop-cap-first":""}${paraFocusMode?" para-focus-mode-active":""}`}
            style={{
              height: idx === 0
                ? contentH - (headerEl ? 80 : 0)
                : contentH - (idx > 0 ? 38 : 0), // หักพื้นที่ ghost text
              overflow:"hidden",
              outline:"none",
            }}
            placeholder={idx === 0 ? "เริ่มเขียนที่นี่..." : ""}
            theme={theme}
            settings={settings}
            typewriterMode={typewriterMode}
            paraFocusMode={paraFocusMode}
            editorScrollRef={editorScrollRef}
            onKeyDown={e=>{ if(e.key==="Tab"){e.preventDefault();document.execCommand("insertText",false,"\u2003");} }}
            quillInstanceRef={(() => {
              // ensure slot exists
              if (!quillRefs.current[idx]) quillRefs.current[idx] = { current: null };
              return quillRefs.current[idx];
            })()}
            onPageFull={() => handlePageFull(idx)}
            onCursorAtTop={() => handleCursorAtTop(idx)}
            isActiveTypingPage={activeTypingPage === idx}
          />

          {/* Page number footer */}
          <div style={{
            position:"absolute", bottom: marginV / 2, left:0, right:0,
            textAlign:"center", fontSize:10, opacity:.3, pointerEvents:"none",
          }}>{idx + 1}</div>
        </div>
        </div>
      ))}

      {/* ── ปุ่ม + เพิ่มหน้าใต้หน้าสุดท้าย ─────────────────────────────────── */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        marginBottom:16, marginTop:-8,
      }}>
        <button
          title="เพิ่มหน้าท้ายบท"
          onClick={() => setInsertPickerAt(pages.length - 1)}
          style={{
            display:"flex", alignItems:"center", gap:6,
            padding:"6px 20px", border:`1.5px dashed ${theme.accent}`,
            borderRadius:24, background:`${theme.accent}11`,
            color:theme.accent, fontSize:12, fontWeight:700,
            cursor:"pointer", transition:".15s", opacity:.7,
          }}
          onMouseEnter={e=>{e.currentTarget.style.opacity=1;e.currentTarget.style.background=`${theme.accent}22`;}}
          onMouseLeave={e=>{e.currentTarget.style.opacity=.7;e.currentTarget.style.background=`${theme.accent}11`;}}
        >
          + เพิ่มหน้า
        </button>
      </div>

      {/* ── Insert Page Picker popup ───────────────────────────────────────── */}
      {insertPickerAt !== null && (
        <div
          onClick={() => setInsertPickerAt(null)}
          style={{
            position:"fixed", inset:0, zIndex:2000,
            background:"#0005", display:"flex",
            alignItems:"center", justifyContent:"center",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background:theme.panel, border:`1px solid ${theme.border}`,
              borderRadius:16, padding:"18px 16px", width:"min(380px,92vw)",
              boxShadow:"0 20px 60px #0004",
            }}
          >
            <div style={{fontWeight:800, fontSize:14, marginBottom:4}}>📋 แทรกหน้า</div>
            <div style={{fontSize:11, opacity:.45, marginBottom:14}}>เลือกประเภทหน้าที่ต้องการแทรก</div>
            <div style={{display:"flex", flexDirection:"column", gap:7}}>
              {PAGE_TEMPLATES.map(tpl => (
                <button
                  key={tpl.id}
                  onClick={() => handleInsertPage(insertPickerAt, tpl.id)}
                  style={{
                    display:"flex", alignItems:"center", gap:12,
                    padding:"10px 14px", border:`1.5px solid ${theme.border}`,
                    borderRadius:10, background:"transparent",
                    cursor:"pointer", textAlign:"left", transition:".12s",
                    color:theme.ink,
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.background=`${theme.accent}12`;e.currentTarget.style.borderColor=theme.accent;}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor=theme.border;}}
                >
                  <span style={{fontSize:22, flexShrink:0, lineHeight:1}}>{tpl.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700, fontSize:13}}>{tpl.label}</div>
                    <div style={{fontSize:11, opacity:.45, marginTop:2}}>{tpl.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setInsertPickerAt(null)}
              style={{
                marginTop:12, width:"100%", padding:"8px",
                border:`1px solid ${theme.border}`, borderRadius:9,
                background:"transparent", color:theme.ink,
                fontSize:12, cursor:"pointer", opacity:.6,
              }}
            >ยกเลิก</button>
          </div>
        </div>
      )}

      {/* Footer หลังหน้าสุดท้าย */}
      {footerEl}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RichEditor — powered by Quill.js (lazy-loaded from CDN)
// content เก็บเป็น HTML string — backward compatible กับ contentEditable เดิม
// ─────────────────────────────────────────────────────────────────────────────
function plainToHtml(text) {
  if (!text) return "";
  if (/<[a-z][\s\S]*>/i.test(text)) return text;
  return text.split(/\n\n+/).map(para =>
    `<p>${para.replace(/\n/g, "<br>")}</p>`
  ).join("") || "<p></p>";
}

// โหลด Quill จาก CDN ครั้งเดียว (singleton promise)
let quillLoadPromise = null;
function loadQuill() {
  if (quillLoadPromise) return quillLoadPromise;
  quillLoadPromise = new Promise((resolve, reject) => {
    if (window.Quill) { resolve(window.Quill); return; }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js";
    script.onload = () => resolve(window.Quill);
    script.onerror = () => { quillLoadPromise = null; reject(new Error("Quill load failed")); };
    document.head.appendChild(script);
  });
  return quillLoadPromise;
}

// ── Global ref เก็บ Quill instance ที่ active อยู่ (สำหรับ toolbar bar) ──────
window.__nfaActiveQuill = null;

// ── Helper: format ข้อความผ่าน Quill API (เรียกจาก toolbar bar) ─────────────
function qFmt(format, value) {
  const q = window.__nfaActiveQuill;
  if (!q) { document.execCommand(format === "bold" ? "bold" : format, false, value); return; }
  const fmt = {
    bold:          () => q.format("bold", !q.getFormat().bold),
    italic:        () => q.format("italic", !q.getFormat().italic),
    underline:     () => q.format("underline", !q.getFormat().underline),
    strikeThrough: () => q.format("strike", !q.getFormat().strike),
    foreColor:     () => q.format("color", value),
    hiliteColor:   () => q.format("background", value),
    removeFormat:  () => { q.removeFormat(q.getSelection()?.index||0, q.getSelection()?.length||0); },
    h1:            () => q.format("header", q.getFormat().header===1 ? false : 1),
    h2:            () => q.format("header", q.getFormat().header===2 ? false : 2),
    p:             () => q.format("header", false),
    justifyLeft:   () => q.format("align", false),
    justifyCenter: () => q.format("align", "center"),
    justifyRight:  () => q.format("align", "right"),
    justifyFull:   () => q.format("align", "justify"),
    insertUnorderedList: () => q.format("list", q.getFormat().list==="bullet" ? false : "bullet"),
    insertOrderedList:   () => q.format("list", q.getFormat().list==="ordered" ? false : "ordered"),
    indent:        () => q.format("indent", "+1"),
    outdent:       () => q.format("indent", "-1"),
  };
  if (fmt[format]) fmt[format]();
}

const RichEditor = memo(function RichEditor({
  chId, content, onChange, onKeyDown,
  className, style, placeholder, autoFocus,
  theme, settings,
  typewriterMode, paraFocusMode, editorScrollRef,
  // ── Cursor-across-pages props ─────────────────────────────────────────────
  quillInstanceRef,   // (pageIdx) => assign quillRef ออกไปให้ PaginatedEditor
  onPageFull,         // () => cursor ล้นหน้า → focus หน้าถัดไป
  onCursorAtTop,      // () => cursor อยู่บรรทัดแรก + กด ↑/Backspace ตอนว่าง → focus หน้าก่อนหน้า
  isActiveTypingPage, // boolean — true = หน้านี้กำลังพิมพ์อยู่ ไม่ต้อง sync innerHTML
}) {
  const containerRef  = useRef(null);
  const quillRef      = useRef(null);
  const chIdRef       = useRef(chId);
  const suppressRef   = useRef(false); // ป้องกัน onChange loop
  const isTypingRef   = useRef(false); // true ขณะ user focus อยู่ใน editor นี้
  const [quillReady, setQuillReady] = useState(false);
  const [loadError, setLoadError]   = useState(false);

  // ── Init Quill ──────────────────────────────────────────────────────────────
  useEffect(() => {
    let destroyed = false;
    loadQuill().then(Quill => {
      if (destroyed || !containerRef.current) return;
      // กันสร้างซ้ำ
      if (quillRef.current) return;

      // สร้าง inner div สำหรับ Quill
      const editorDiv = document.createElement("div");
      containerRef.current.appendChild(editorDiv);

      const q = new Quill(editorDiv, {
        theme: "snow",
        placeholder: placeholder || "เริ่มเขียนที่นี่...",
        modules: {
          toolbar: false, // ซ่อน toolbar ของ Quill — ใช้ toolbar ของ NFA แทน
          history: { delay: 1000, maxStack: 200, userOnly: true },
          keyboard: {
            bindings: {
              // ส่ง Ctrl+S ออกไปให้ parent handle
              save: {
                key: "s", ctrlKey: true,
                handler() {
                  if (onKeyDown) onKeyDown({ key: "s", ctrlKey: true, preventDefault: () => {} });
                  return false;
                }
              },
              // ↑ ที่บรรทัดแรกสุด → ข้ามไปหน้าก่อนหน้า
              arrowUpAtTop: {
                key: 38, // ArrowUp
                handler(range) {
                  if (!onCursorAtTop) return true;
                  const bounds = q.getBounds(range.index);
                  const firstLineBounds = q.getBounds(0);
                  if (bounds && firstLineBounds && bounds.top <= firstLineBounds.top + 2) {
                    onCursorAtTop("end");
                    return false;
                  }
                  return true;
                }
              },
              // Backspace ที่ index 0 และ content ว่าง → ข้ามไปหน้าก่อนหน้า
              backspaceAtStart: {
                key: 8, // Backspace
                handler(range) {
                  if (!onCursorAtTop) return true;
                  if (range.index === 0 && range.length === 0) {
                    const text = q.getText().replace(/\n$/, "");
                    if (text.length === 0) { onCursorAtTop("end"); return false; }
                    onCursorAtTop("end");
                    return false;
                  }
                  return true;
                }
              },
            }
          }
        }
      });

      // ลงทะเบียน quill instance ออกไปให้ PaginatedEditor
      if (quillInstanceRef) quillInstanceRef.current = q;

      // ใส่เนื้อหาครั้งแรก
      suppressRef.current = true;
      const html = plainToHtml(content || "");
      q.root.innerHTML = html;
      suppressRef.current = false;

      // onChange handler
      q.on("text-change", () => {
        if (suppressRef.current) return;
        const html = q.root.innerHTML;
        // Quill ทิ้ง <p><br></p> เมื่อว่าง — normalize
        const clean = html === "<p><br></p>" ? "" : html;
        onChange(chIdRef.current, clean);

        // ── ตรวจ overflow → แจ้ง onPageFull ────────────────────────────────
        if (onPageFull && q.root.scrollHeight > q.root.clientHeight + 4) {
          onPageFull();
        }
      });

      if (autoFocus) {
        setTimeout(() => q.focus(), 50);
      }

      // ลงทะเบียนเป็น active quill เมื่อ focus
      q.root.addEventListener("focus", () => { window.__nfaActiveQuill = q; isTypingRef.current = true; });
      q.root.addEventListener("blur",  () => { window.__nfaActiveQuill = null; isTypingRef.current = false; });

      // ── Typewriter Mode: scroll บรรทัดที่พิมพ์กลางจอ ──────────────────────
      q.on("text-change", () => {
        if (!typewriterMode) return;
        const scrollEl = editorScrollRef?.current;
        if (!scrollEl) return;
        const sel = q.getSelection();
        if (!sel) return;
        const bounds = q.getBounds(sel.index);
        if (!bounds) return;
        // คำนวณ offset ของ editor root จาก scrollEl
        const rootRect  = q.root.getBoundingClientRect();
        const scrollRect = scrollEl.getBoundingClientRect();
        const lineTop = rootRect.top - scrollRect.top + scrollEl.scrollTop + bounds.top;
        const lineCenter = lineTop + bounds.height / 2;
        const target = lineCenter - scrollEl.clientHeight / 2;
        scrollEl.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
      });

      // ── Paragraph Focus Mode: dim/highlight paragraphs ─────────────────────
      if (paraFocusMode) {
        const updateParaFocus = () => {
          const sel = q.getSelection();
          if (!sel) return;
          const bounds = q.getBounds(sel.index);
          if (!bounds) return;
          const paras = q.root.querySelectorAll("p");
          paras.forEach(p => p.classList.remove("para-focused"));
          // หา paragraph ที่ cursor อยู่ใน
          paras.forEach(p => {
            const r = p.getBoundingClientRect();
            const editorRect = q.root.getBoundingClientRect();
            const pTop = r.top - editorRect.top;
            if (pTop <= bounds.top + bounds.height && pTop + r.height > bounds.top) {
              p.classList.add("para-focused");
            }
          });
        };
        q.on("selection-change", updateParaFocus);
        q.on("text-change", updateParaFocus);
      }

      quillRef.current = q;

      // FIX: apply paragraph format ทันทีหลัง init ป้องกัน cursor กลางหน้า
      const _fmt    = settings?.paragraphFormat || {};
      const _align  = _fmt.textAlign || settings?.textAlign || "justify";
      const _indent = (_fmt.firstLineIndent ?? 2) > 0 ? `${_fmt.firstLineIndent ?? 2}em` : "0";
      q.root.style.textAlign  = _align;
      q.root.style.textIndent = _indent;
      q.root.style.caretColor = theme?.accent || "#8b4513";

      setQuillReady(true);
    }).catch(() => {
      if (!destroyed) setLoadError(true);
    });

    return () => {
      destroyed = true;
      if (quillRef.current) {
        // Quill ไม่มี destroy() อย่างเป็นทางการ — แค่ clear ref
        quillRef.current = null;
        setQuillReady(false);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount ครั้งเดียว

  // ── sync content เมื่อเปลี่ยนบท ────────────────────────────────────────────
  useEffect(() => {
    chIdRef.current = chId;
    const q = quillRef.current;
    if (!q) return;
    // เปลี่ยนบท — sync เสมอ (แต่ reset isTyping ด้วย)
    isTypingRef.current = false;
    suppressRef.current = true;
    const html = plainToHtml(content || "");
    if (q.root.innerHTML !== html) {
      q.root.innerHTML = html;
      q.history.clear();
      q.setSelection(0, 0, "silent");
    }
    suppressRef.current = false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chId]);

  // ── sync content เมื่อ external update (mic, replace-all) ─────────────────
  useEffect(() => {
    const q = quillRef.current;
    // บล็อก sync ทุกกรณีที่ user กำลังพิมพ์อยู่ในหน้านี้
    if (!q || isTypingRef.current) return;
    if (isActiveTypingPage) return;
    suppressRef.current = true;
    const html = plainToHtml(content || "");
    if (q.root.innerHTML !== html) q.root.innerHTML = html;
    suppressRef.current = false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  // ── ปรับ theme สี + paragraph format ─────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current.querySelector(".ql-editor");
    if (!el) return;
    el.style.color      = theme.ink;
    el.style.caretColor = theme.accent;
    el.style.fontFamily = settings?.fontFamily || "Sarabun, sans-serif";
    // FIX: apply textAlign + textIndent จาก paragraphFormat ไปยัง Quill root
    // เพื่อให้ cursor/caret position ถูกต้อง ไม่กระโดดไปกลางหน้า
    const fmt    = settings?.paragraphFormat || {};
    const tAlign = fmt.textAlign || settings?.textAlign || "justify";
    const tIndent = (fmt.firstLineIndent ?? 2) > 0 ? `${fmt.firstLineIndent ?? 2}em` : "0";
    el.style.textAlign  = tAlign;
    el.style.textIndent = tIndent;
  }, [theme, settings, quillReady]);

  // ── expose execCommand-style API ผ่าน window สำหรับ toolbar bar ──────────
  // (zoom bar ยังใช้ document.execCommand ได้เพราะ Quill root ยังเป็น contentEditable)

  if (loadError) {
    // Fallback: contentEditable ธรรมดา
    return (
      <div
        contentEditable suppressContentEditableWarning
        className={className}
        style={{ ...style, outline: "none", whiteSpace: "pre-wrap", wordBreak: "break-word", color: theme.ink }}
        onInput={e => onChange(chId, e.currentTarget.innerHTML)}
        data-placeholder={placeholder}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        position: "relative",
      }}
    >
      {/* Quill mount ที่นี่ */}
      {!quillReady && (
        <div style={{
          padding: "32px", textAlign: "center",
          opacity: .4, fontSize: 13, color: theme.ink,
        }}>กำลังโหลด editor...</div>
      )}
      <style>{`
        .ql-editor {
          outline: none;
          min-height: 200px;
          font-size: ${settings?.fontSize||16}px;
          line-height: ${settings?.lineHeight||1.8};
          text-align: ${(settings?.paragraphFormat?.textAlign || settings?.textAlign || "justify")};
          text-indent: ${(settings?.paragraphFormat?.firstLineIndent ?? 2) > 0 ? `${settings?.paragraphFormat?.firstLineIndent ?? 2}em` : "0"};
          overflow: hidden !important;
        }
        .ql-editor p {
          margin: 0 0 0.8em 0;
          text-align: inherit;
          text-indent: inherit;
        }
        .ql-editor p:last-child { margin-bottom: 0; }
        .ql-editor.ql-blank::before {
          color: ${theme.ink}44;
          font-style: normal;
          content: attr(data-placeholder);
          pointer-events: none;
          position: absolute;
          /* ป้องกัน placeholder ลอยไปกลาง */
          left: 0;
          right: 0;
          text-align: left;
          text-indent: 0;
        }
        .ql-container.ql-snow { border: none; overflow: hidden !important; }
        .ql-container { font-family: ${settings?.fontFamily||"Sarabun"}, sans-serif; overflow: hidden !important; }
      `}</style>
    </div>
  );
});



const newId = () => typeof crypto!=='undefined'&&crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

// ─── CRASH RECOVERY ──────────────────────────────────────────────────────────
// เก็บ draft ล่าสุดใน sessionStorage เพื่อ recover หาก browser ปิดกระทันหัน
const CRASH_KEY = "nfa_crash_draft";
const CRASH_MAX_CHARS = 500_000; // จำกัดขนาดที่ sessionStorage รองรับได้

function saveCrashDraft(projectId, chapters) {
  try {
    const payload = JSON.stringify({
      projectId,
      savedAt: new Date().toISOString(),
      chapters: chapters.map(ch => ({ id:ch.id, title:ch.title, content:(ch.content||"").slice(0, 8000) })),
    });
    if (payload.length < CRASH_MAX_CHARS) {
      sessionStorage.setItem(CRASH_KEY, payload);
    }
  } catch(e) { /* sessionStorage อาจเต็ม — ไม่ต้อง throw */ }
}

function loadCrashDraft() {
  try {
    const raw = sessionStorage.getItem(CRASH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function clearCrashDraft() {
  try { sessionStorage.removeItem(CRASH_KEY); } catch(e) {}
}

// ─── INDEXED DB ──────────────────────────────────────────────────────────────
const DB_NAME    = "NovelForgeV8";   // V8 (migrated from NovelForgeV5)
const DB_VERSION = 2;               // V25: added "series" store
const DB_NAME_LEGACY = "NovelForgeV5";

// Migrate projects from old DB if new DB is empty
async function migrateFromLegacyDB() {
  try {
    const legacyDB = await new Promise((res, rej) => {
      const r = indexedDB.open(DB_NAME_LEGACY, 1);
      r.onsuccess = e => res(e.target.result);
      r.onerror = () => res(null); // old DB may not exist — that's fine
    });
    if (!legacyDB) return;
    const legacyProjects = await new Promise((res, rej) => {
      try {
        const tx = legacyDB.transaction("projects", "readonly");
        const req = tx.objectStore("projects").getAll();
        req.onsuccess = () => res(req.result || []);
        req.onerror  = () => res([]);
      } catch(e) { res([]); }
    });
    if (legacyProjects.length === 0) return;
    // Write to new DB
    for (const p of legacyProjects) {
      await dbPut("projects", { ...p, version: "8" });
    }
    console.info(`NovelForge: migrated ${legacyProjects.length} project(s) from legacy DB`);
  } catch(e) {
    console.error("Legacy DB migration error:", e);
  }
}

let _dbCache = null;
function openDB() {
  if (_dbCache) return Promise.resolve(_dbCache);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      // v1 stores (create if not exist)
      if (!db.objectStoreNames.contains("projects")) {
        const store = db.createObjectStore("projects", { keyPath:"id" });
        store.createIndex("updatedAt", "updatedAt", { unique:false });
      }
      if (!db.objectStoreNames.contains("assets")) {
        const aStore = db.createObjectStore("assets", { keyPath:"id" });
        aStore.createIndex("projectId", "projectId", { unique:false });
        aStore.createIndex("category", "category", { unique:false });
      }
      if (!db.objectStoreNames.contains("snapshots")) {
        const sStore = db.createObjectStore("snapshots", { keyPath:"id" });
        sStore.createIndex("projectId", "projectId", { unique:false });
        sStore.createIndex("savedAt",   "savedAt",   { unique:false });
      }
      // v2: Series store
      if (!db.objectStoreNames.contains("series")) {
        const serStore = db.createObjectStore("series", { keyPath:"id" });
        serStore.createIndex("title",     "title",     { unique:false });
        serStore.createIndex("updatedAt", "updatedAt", { unique:false });
      }
    };
    req.onsuccess = (e) => { _dbCache = e.target.result; resolve(_dbCache); };
    req.onerror = (e) => reject(e.target.error);
  });
}

async function dbGetAll(storeName) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function dbGet(storeName, id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function dbPut(storeName, item) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const req = store.put(item);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function dbDelete(storeName, id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function dbGetByIndex(storeName, indexName, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const index = store.index(indexName);
    const req = index.getAll(value);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// ─── DEFAULTS ────────────────────────────────────────────────────────────────
const defaultBook = () => ({
  title:"ชื่อหนังสือ", subtitle:"", author:"นามปากกา", pen:"", publisher:"",
  year:new Date().getFullYear().toString(), genre:"นิยาย", series:"", seriesNum:"1",
  showTOC:true,
});

const defaultSettings = () => ({
  font:"Sarabun", fontSize:16, lineHeight:185, marginV:56, marginH:52,
  textAlign:"justify", dropCap:true, layout:"a5",
  coverTemplate:"dark", coverImageData:null, coverBrightness:100, coverOverlay:30,
  backCoverTemplate:"dark", backCoverImageData:null, backCoverText:"",
  theme:"white", zoom:100, divider:"◆◆◆",
  dividerDecor: { type:"text" },
  pexelsKey: "",
  paragraphFormat: { ...PARAGRAPH_FORMAT_DEFAULTS },
  typoOptions: { ...DEFAULT_TYPO_OPTIONS },
  tocStyle: {
    template: "classic",
    headingText: "สารบัญ",
    subheadingText: "Table of Contents",
    headingAlign: "center",
    showPageNumbers: true,
    showSubtitle: true,
    leaderChar: "dots",
    leaderCustom: "·",
    headingSize: 18,
    fontSize: 14,
    pageNumColor: "accent",
    rowSpacing: 10,
    showBorderBottom: true,
    decor: {
      headingFrame: "none",
      headingBg: "none",
      headingBgColor: "#f5ede0",
      headingBgGradient: "linear-gradient(135deg,#f5ede0,#ddd0bc)",
      headingBgImage: null,
      cornerOrnament: "none",
    },
  },
  chapterHeaderStyle: {
    style: "plain",
    bgImage: null,
    bgColor: "none",
    bgSolidColor: "#1a1612",
    bgGradient: "linear-gradient(135deg,#1a1210,#3d2010)",
    bgOverlay: 40,
    frameStyle: "none",
    ornament: "none",
    ornamentId: "royal_border",
    textColor: "auto",
    height: 120,
  },
  pageBorder: {
    enabled: false,
    style: "single",
    color: "accent",
    customColor: "#8b4513",
    width: 1,
    radius: 0,
    inset: 8,
  },
  colorPalette: {
    bodyText:    "",   // "" = ใช้ theme.ink (auto)
    headingText: "",   // "" = auto
    accentColor: "",   // "" = ใช้ theme.accent
    bgPage:      "",   // "" = ใช้ theme.bg
    dividerColor:"",   // "" = auto
  },
  orientation: "portrait",  // "portrait" | "landscape"
  showRuler:   false,
});

// ─── TOC TEMPLATES ───────────────────────────────────────────────────────────
const TOC_TEMPLATES = [
  {
    id: "classic",
    label: "Classic Dotted",
    desc: "เส้น Dot คลาสสิก เหมาะกับนิยายทุกแนว",
    preview: "บทที่ 1 ............ 3",
    style: {
      headingAlign: "center", showPageNumbers: true, leaderChar: "dots",
      showBorderBottom: true, pageNumColor: "accent",
    },
  },
  {
    id: "modern",
    label: "Modern Minimal",
    desc: "ไม่มีเส้น Dot เรียบหรู หัวข้อและเลขหน้าชิดสองฝั่ง",
    preview: "บทที่ 1          3",
    style: {
      headingAlign: "center", showPageNumbers: true, leaderChar: "space",
      showBorderBottom: false, pageNumColor: "muted",
    },
  },
  {
    id: "elegant",
    label: "Elegant Lines",
    desc: "มีเส้นคั่นบาง ดีไซน์สวยงาม เหมาะกับโรแมนซ์",
    preview: "บทที่ 1 ─────── 3",
    style: {
      headingAlign: "center", showPageNumbers: true, leaderChar: "line",
      showBorderBottom: true, pageNumColor: "accent",
    },
  },
  {
    id: "boxed",
    label: "Numbered Box",
    desc: "เลขบทอยู่ในกล่องสี่เหลี่ยม สไตล์ Manga/Manhwa",
    preview: "[01] บทที่ 1 ........ 3",
    style: {
      headingAlign: "left", showPageNumbers: true, leaderChar: "dots",
      showBorderBottom: false, pageNumColor: "accent", boxedNumbers: true,
    },
  },
  {
    id: "dark_novel",
    label: "Dark Novel",
    desc: "สไตล์มืด เส้น Dash เหมาะกับ Horror/Dark Fantasy",
    preview: "บทที่ 1 — — — 3",
    style: {
      headingAlign: "left", showPageNumbers: true, leaderChar: "dashes",
      showBorderBottom: false, pageNumColor: "ink",
    },
  },
  {
    id: "magazine",
    label: "Magazine",
    desc: "ไม่แสดงเลขหน้า เน้นชื่อบท สไตล์นิตยสาร/Zine",
    preview: "บทที่ 1",
    style: {
      headingAlign: "left", showPageNumbers: false, leaderChar: "space",
      showBorderBottom: false, pageNumColor: "muted",
    },
  },
];

const defaultChapters = () => [
  { id:newId(), title:"บทที่ 1 — ลมกรด", content:"ณ ชายแดนที่ขอบฟ้าแห่งอาณาจักรอาร์เวน สายลมพัดผ่านทุ่งหญ้าสีทองราวกับการโอดครวญของวิญญาณที่ไม่มีที่ไป\n\nเซล่า หญิงสาวผมดำประกายสีน้ำเงิน ยืนอยู่บนหน้าผาสูงชัน สายตาปักแน่นอยู่ที่ขอบฟ้าอันไกลโพ้น\n\n«ถ้าลมพาเธอไป จงไปด้วยใจที่กล้า» นั่นคือสิ่งที่ยายบอกในวันที่เธอจากไปตลอดกาล", note:"" },
  { id:newId(), title:"บทที่ 2 — เมืองใต้พายุ", content:"ตลาดเมืองคาลิสเต้มีกลิ่นของควันธูปและเครื่องเทศปนกัน พ่อค้าแม่ค้าเรียกขายสินค้าด้วยเสียงดัง\n\nเซล่าสวมผ้าคลุมหน้าสีน้ำตาล เดินผ่านฝูงชนอย่างระมัดระวัง เธอกำลังมองหาใครบางคน", note:"" },
];

const defaultCharacters = () => [
  { id:newId(), name:"เซล่า", age:"19", role:"นางเอก", status:"มีชีวิต", appearsIn:"เล่ม 1-5", notes:"มีพลัง Fragment Core ลับ", gender:"หญิง", faction:"Engineers Guild", color:"#8b4513" },
];

const defaultTimeline = () => [
  { id:newId(), year:"ปี 0",  title:"The Fall",           desc:"อาณาจักรล่มสลายจากพลังงาน Core ระเบิด",     book:"" },
  { id:newId(), year:"ปี 12", title:"เซล่าค้นพบ Core",    desc:"เซล่าพบ Fragment Core ในซากปรักหักพัง",      book:"เล่ม 1" },
];

const defaultWorldBible = () => ({
  locations:[
    { id:newId(), name:"Iron Valley",   desc:"หุบเขาหลักที่เต็มไปด้วยเหมืองแร่ Core", type:"สถานที่หลัก" },
    { id:newId(), name:"Arcadia Tower", desc:"หอคอยศูนย์กลางการปกครอง สูง 300 เมตร",  type:"สถานที่สำคัญ" },
  ],
  organizations:[
    { id:newId(), name:"Engineers Guild", desc:"กลุ่มวิศวกร Core ที่เซล่าสังกัด",  alignment:"ดี" },
    { id:newId(), name:"Arcadia Council", desc:"สภาปกครองสูงสุด",                   alignment:"เป็นกลาง" },
  ],
  lore:[
    { id:newId(), title:"Fragment Core", desc:"แหล่งพลังงานโบราณที่ถูกสร้างโดยบรรพบุรุษ มีทั้งหมด 7 ชิ้น" },
    { id:newId(), title:"The Fall",      desc:"เหตุการณ์ 100 ปีก่อนที่ Core หลักระเบิดทำลายอาณาจักรเก่า" },
  ],
});

// Default special pages
const defaultSpecialPages = () => [
  { id:newId(), type:"copyright", title:"Copyright", content:"© 2025 All rights reserved.\n\nห้ามทำซ้ำหรือดัดแปลงส่วนหนึ่งส่วนใดของหนังสือเล่มนี้ไม่ว่าในรูปแบบใด โดยไม่ได้รับอนุญาต", position:2 },
];

// Default book structure
const defaultBookStructure = (projectId) => [
  { id:newId(), type:"front_cover",  label:"ปกหน้า",    locked:true,  visible:true },
  { id:newId(), type:"toc",          label:"สารบัญ",    locked:false, visible:true },
  { id:newId(), type:"chapters",     label:"เนื้อเรื่อง", locked:true, visible:true },
  { id:newId(), type:"back_cover",   label:"ปกหลัง",    locked:true,  visible:true },
];


// ─── NOVEL TEMPLATES (20 แนว) ────────────────────────────────────────────────
const NOVEL_TEMPLATES = [
  {
    id: "romance",
    icon: "💕", label: "โรแมนติก", labelEn: "Romance",
    desc: "นิยายรักโรแมนติก ตัวละครคู่รัก ความสัมพันธ์ที่ลึกซึ้ง",
    color: "#ec4899",
    includes: ["Relationship Tracker (Timeline)", "Character Arc Notes", "โรแมนซ์ Layout", "2 ตัวละครหลัก"],
    settings: {
      font:"Sarabun", fontSize:16, lineHeight:200, marginV:60, marginH:58,
      textAlign:"justify", dropCap:true, layout:"a5", theme:"white",
      coverTemplate:"rose",
      divider:"❦",
      dividerDecor:{ type:"text" },
      tocStyle:{
        template:"elegant", headingText:"สารบัญ", headingAlign:"center",
        showPageNumbers:true, leaderChar:"line", showBorderBottom:true, pageNumColor:"accent",
        decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" },
      },
      chapterHeaderStyle:{
        style:"framed", bgColor:"none", bgSolidColor:"#fff0f3",
        bgGradient:"linear-gradient(135deg,#fff0f3,#ffe4ec)",
        bgOverlay:20, frameStyle:"simple", ornament:"show", ornamentId:"floral_vine",
        textColor:"auto", height:110,
      },
      pageBorder:{ enabled:true, style:"single", color:"accent", customColor:"#ec4899", width:1, radius:4, inset:10 },
    },
    book: { genre:"โรแมนติก", targetAudience:"ผู้ใหญ่ 18+", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — พบกันครั้งแรก", content:"" },
      { title:"บทที่ 2 — ความประทับใจ", content:"" },
      { title:"บทที่ 3 — ใกล้ชิดกันมากขึ้น", content:"" },
      { title:"บทที่ 4 — อุปสรรค", content:"" },
      { title:"บทที่ 5 — จุดเปลี่ยน", content:"" },
    ],
    writingGoal: 1000,
    characters: [
      { name:"นางเอก", age:"22", role:"นางเอก", status:"มีชีวิต", appearsIn:"เล่ม 1", notes:"เป้าหมาย: หาตัวตน / Character Arc: ยอมรับความรัก", gender:"หญิง", faction:"", color:"#ec4899" },
      { name:"พระเอก", age:"25", role:"พระเอก", status:"มีชีวิต", appearsIn:"เล่ม 1", notes:"เป้าหมาย: ปกป้องคนที่รัก / Character Arc: เปิดใจ", gender:"ชาย", faction:"", color:"#8b4513" },
    ],
    worldPreset: {
      locations: [
        { name:"ร้านกาแฟ Le Petit", desc:"สถานที่พบกันครั้งแรก บรรยากาศอบอุ่น", type:"สถานที่หลัก" },
        { name:"อพาร์ตเมนต์นางเอก", desc:"พื้นที่ส่วนตัว ฉากสำรวจตัวตน", type:"สถานที่รอง" },
      ],
      organizations: [
        { name:"ครอบครัวนางเอก", desc:"แรงกดดันและสนับสนุนในเรื่อง", alignment:"เป็นกลาง" },
      ],
      lore: [
        { title:"Relationship Arc 5 ขั้น", desc:"พบกัน → ดึงดูด → ขัดแย้ง → คืนดี → ยอมรับ" },
        { title:"Character Arc นางเอก", desc:"เริ่ม: กลัวความสัมพันธ์ → จุดเปลี่ยน: บทที่ 4 → ปลาย: เปิดใจ" },
      ],
    },
  },
  {
    id: "fantasy",
    icon: "🐉", label: "แฟนตาซี", labelEn: "Fantasy",
    desc: "โลกเวทมนตร์ มังกร นักรบ ราชวงศ์ และการผจญภัย",
    color: "#8b5cf6",
    includes: ["Magic System", "Kingdom Structure", "Character Database", "Timeline เหตุการณ์", "4 ตัวละครหลัก"],
    settings: {
      font:"Noto Serif Thai", fontSize:15, lineHeight:190, marginV:52, marginH:48,
      textAlign:"justify", dropCap:false, layout:"a5", theme:"dark",
      coverTemplate:"fantasy",
      divider:"◆◆◆",
      dividerDecor:{ type:"svg", svgId:"royal_border" },
      tocStyle:{
        template:"dark_novel", headingText:"สารบัญ", headingAlign:"left",
        showPageNumbers:true, leaderChar:"dashes", showBorderBottom:false, pageNumColor:"accent",
        decor:{ headingFrame:"ornate", headingBg:"none", cornerOrnament:"none" },
      },
      chapterHeaderStyle:{
        style:"banner", bgColor:"gradient", bgSolidColor:"#1a1000",
        bgGradient:"linear-gradient(135deg,#1a1000,#3d2800)",
        bgOverlay:35, frameStyle:"ornate", ornament:"show", ornamentId:"celtic_knot",
        textColor:"auto", height:130,
      },
      pageBorder:{ enabled:false, style:"ornate", color:"accent", customColor:"#d97706", width:1, radius:0, inset:8 },
    },
    book: { genre:"แฟนตาซี", targetAudience:"ทุกวัย", language:"ไทย" },
    chapters: [
      { title:"บทนำ — โลกของเรื่อง", content:"" },
      { title:"บทที่ 1 — ผู้ถูกเลือก", content:"" },
      { title:"บทที่ 2 — การเดินทางเริ่มต้น", content:"" },
      { title:"บทที่ 3 — พันธมิตรคนแรก", content:"" },
    ],
    writingGoal: 1500,
    characters: [
      { name:"ตัวเอก", age:"18", role:"พระเอก", status:"มีชีวิต", appearsIn:"เล่ม 1", notes:"พลัง: ยังไม่ตื่น / จุดอ่อน: ไม่เชื่อในตัวเอง", gender:"ชาย", faction:"ชาวบ้าน", color:"#8b5cf6" },
      { name:"ที่ปรึกษาผู้รู้", age:"60", role:"พระรอง", status:"มีชีวิต", appearsIn:"เล่ม 1", notes:"รู้ความจริงเกี่ยวกับตัวเอก แต่ยังไม่บอก", gender:"หญิง", faction:"Order of Mages", color:"#06b6d4" },
      { name:"ผู้ร้าย", age:"40", role:"ผู้ร้ายหลัก", status:"มีชีวิต", appearsIn:"เล่ม 1", notes:"เป้าหมาย: ครองโลก / แรงจูงใจ: แค้น", gender:"ชาย", faction:"Shadow Council", color:"#1f2937" },
      { name:"เพื่อนสนิท", age:"19", role:"นางรอง", status:"มีชีวิต", appearsIn:"เล่ม 1", notes:"นักธนู ชำนาญป่า / ซ่อนความรู้สึก", gender:"หญิง", faction:"Rangers Guild", color:"#059669" },
    ],
    worldPreset: {
      locations: [
        { name:"หมู่บ้านต้นทาง", desc:"บ้านเกิดตัวเอก ถูกโจมตีในบทที่ 1", type:"สถานที่หลัก" },
        { name:"หอคอย Order of Mages", desc:"ที่ฝึกฝนและเรียนรู้เวทมนตร์", type:"สถานที่สำคัญ" },
        { name:"ป่าต้องสาป", desc:"เขตอันตราย มีสิ่งมีชีวิตโบราณ", type:"สถานที่อันตราย" },
        { name:"ปราสาท Shadow Council", desc:"ฐานของผู้ร้าย จุดหมายปลายทาง", type:"สถานที่ปลายทาง" },
      ],
      organizations: [
        { name:"Order of Mages", desc:"องค์กรนักเวทย์ ปกป้องโลก", alignment:"ดี" },
        { name:"Shadow Council", desc:"กลุ่มของผู้ร้าย ต้องการทำลายระเบียบโลก", alignment:"ชั่ว" },
        { name:"Rangers Guild", desc:"นักรบป่า รักษาสมดุลธรรมชาติ", alignment:"เป็นกลาง" },
      ],
      lore: [
        { title:"Magic System", desc:"เวทมนตร์มาจาก 4 ธาตุ: ไฟ น้ำ ดิน ลม / ผู้ใช้ต้องผ่านพิธี Awakening" },
        { title:"Prophecy แห่งผู้ถูกเลือก", desc:"'เมื่อดาวดับ ผู้ไม่มีพลังจะกลายเป็นผู้พิทักษ์โลก'" },
        { title:"ประวัติศาสตร์โลก", desc:"500 ปีก่อน: สงครามใหญ่ทำลายอาณาจักรเก่า / ปัจจุบัน: สันติภาพเปราะบาง" },
      ],
    },
  },
  {
    id: "scifi",
    icon: "🚀", label: "ไซไฟ", labelEn: "Sci-Fi",
    desc: "อนาคต เทคโนโลยี อวกาศ หุ่นยนต์ AI และมนุษย์",
    color: "#06b6d4",
    includes: ["Technology Database", "Planet & Location Map", "Corporation Factions", "Timeline อนาคต", "3 ตัวละครหลัก"],
    settings: {
      font:"Sarabun", fontSize:14, lineHeight:183, marginV:48, marginH:44,
      textAlign:"left", dropCap:false, layout:"a5", theme:"dark",
      coverTemplate:"navy",
      divider:"···",
      dividerDecor:{ type:"text" },
      tocStyle:{
        template:"modern", headingText:"CONTENTS", headingAlign:"left",
        showPageNumbers:true, leaderChar:"space", showBorderBottom:false, pageNumColor:"muted",
        decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" },
      },
      chapterHeaderStyle:{
        style:"split", bgColor:"solid", bgSolidColor:"#0a1628",
        bgGradient:"linear-gradient(135deg,#020817,#0a1628)",
        bgOverlay:20, frameStyle:"none", ornament:"none", ornamentId:"simple_line",
        textColor:"auto", height:100,
      },
      pageBorder:{ enabled:false, style:"single", color:"accent", customColor:"#0ea5e9", width:1, radius:0, inset:8 },
    },
    book: { genre:"ไซไฟ", targetAudience:"ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — ปีค.ศ. 2350", content:"" },
      { title:"บทที่ 2 — สัญญาณจากห้วงอวกาศ", content:"" },
      { title:"บทที่ 3 — ภารกิจ", content:"" },
      { title:"บทที่ 4 — การค้นพบ", content:"" },
    ],
    writingGoal: 1200,
    characters: [
      { name:"กัปตัน / ตัวเอก", age:"35", role:"พระเอก", status:"มีชีวิต", appearsIn:"เล่ม 1", notes:"อดีตทหาร / ขับเรือเพื่อหาความจริงเกี่ยวกับสัญญาณ", gender:"หญิง", faction:"Independent Fleet", color:"#06b6d4" },
      { name:"AI ประจำเรือ", age:"N/A", role:"พระรอง", status:"มีชีวิต", appearsIn:"เล่ม 1", notes:"AI ที่เริ่มมีอารมณ์ความรู้สึก / คำถาม: ฉันมีสิทธิ์อะไร?", gender:"ไม่ระบุ", faction:"Independent Fleet", color:"#818cf8" },
      { name:"ตัวแทนบริษัท", age:"42", role:"ผู้ร้ายหลัก", status:"มีชีวิต", appearsIn:"เล่ม 1", notes:"ซ่อนข้อมูลสัญญาณ / เป้าหมาย: ผลประโยชน์บริษัท", gender:"ชาย", faction:"Nexus Corp", color:"#64748b" },
    ],
    worldPreset: {
      locations: [
        { name:"ยานอวกาศ Meridian", desc:"บ้านและฐานปฏิบัติการของตัวเอก", type:"สถานที่หลัก" },
        { name:"ดาวเคราะห์ Kepler-7b", desc:"แหล่งกำเนิดสัญญาณลึกลับ", type:"สถานที่สำคัญ" },
        { name:"สถานีอวกาศ Nexus Prime", desc:"ศูนย์กลาง Nexus Corp / ข้อมูลลับทั้งหมดอยู่ที่นี่", type:"สถานที่อันตราย" },
      ],
      organizations: [
        { name:"Nexus Corp", desc:"บริษัทเทคโนโลยีที่ครองอำนาจ 60% ของเศรษฐกิจระบบสุริยะ", alignment:"ชั่ว" },
        { name:"Independent Fleet", desc:"กลุ่มนักบินอิสระ ต่อต้านการผูกขาด", alignment:"ดี" },
        { name:"UN Space Authority", desc:"รัฐบาลโลก ถูกซื้อบางส่วนโดย Nexus", alignment:"เป็นกลาง" },
      ],
      lore: [
        { title:"Technology Level ค.ศ. 2350", desc:"FTL travel ได้ แต่ช้า / AI มีสิทธิ์บางส่วน / Terraforming ดาวเคราะห์ใช้เวลา 100 ปี" },
        { title:"สัญญาณลึกลับ", desc:"ความถี่ที่ไม่รู้จัก รับได้เฉพาะใกล้ Kepler-7b / Nexus Corp ปิดข่าว 5 ปีแล้ว" },
        { title:"AI Rights Movement", desc:"ขบวนการสิทธิ AI เพิ่งเริ่ม 10 ปี บางรัฐรับรอง บาง Corp ปฏิเสธ" },
      ],
    },
  },
  {
    id: "mystery",
    icon: "🔍", label: "สืบสวน", labelEn: "Mystery",
    desc: "คดีปริศนา นักสืบ เบาะแส การไขปริศนา",
    color: "#374151",
    settings: {
      font:"Sarabun", fontSize:14, lineHeight:180, marginV:48, marginH:44,
      textAlign:"justify", dropCap:false, layout:"a5", theme:"white",
      coverTemplate:"slate",
      divider:"— — —",
      dividerDecor:{ type:"text" },
      tocStyle:{
        template:"modern", headingText:"สารบัญ", headingAlign:"left",
        showPageNumbers:true, leaderChar:"space", showBorderBottom:false, pageNumColor:"muted",
        decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" },
      },
      chapterHeaderStyle:{
        style:"plain", bgColor:"none", bgSolidColor:"#1c1c24",
        bgGradient:"linear-gradient(135deg,#1c1c24,#2e2e3a)",
        bgOverlay:30, frameStyle:"none", ornament:"none", ornamentId:"simple_line",
        textColor:"auto", height:90,
      },
      pageBorder:{ enabled:false, style:"single", color:"accent", customColor:"#374151", width:1, radius:0, inset:8 },
    },
    book: { genre:"สืบสวนสอบสวน", targetAudience:"ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — ศพแรก", content:"" },
      { title:"บทที่ 2 — เบาะแส", content:"" },
      { title:"บทที่ 3 — ผู้ต้องสงสัย", content:"" },
      { title:"บทที่ 4 — หักมุม", content:"" },
    ],
    writingGoal: 1000,
  },
  {
    id: "horror",
    icon: "👻", label: "สยองขวัญ", labelEn: "Horror",
    desc: "ความน่ากลัว เหนือธรรมชาติ จิตวิทยา สิ่งลึกลับ",
    color: "#1f2937",
    settings: {
      font:"Noto Serif Thai", fontSize:14, lineHeight:188, marginV:50, marginH:46,
      textAlign:"justify", dropCap:false, layout:"a5", theme:"dark",
      coverTemplate:"horror",
      divider:"* * *",
      dividerDecor:{ type:"text" },
      tocStyle:{
        template:"dark_novel", headingText:"สารบัญ", headingAlign:"left",
        showPageNumbers:true, leaderChar:"dashes", showBorderBottom:false, pageNumColor:"ink",
        decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" },
      },
      chapterHeaderStyle:{
        style:"plain", bgColor:"none", bgSolidColor:"#000000",
        bgGradient:"linear-gradient(135deg,#000000,#0d0000)",
        bgOverlay:80, frameStyle:"none", ornament:"none", ornamentId:"simple_line",
        textColor:"auto", height:90,
      },
      pageBorder:{ enabled:false, style:"single", color:"custom", customColor:"#991b1b", width:1, radius:0, inset:8 },
    },
    book: { genre:"สยองขวัญ", targetAudience:"ผู้ใหญ่ 18+", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — บ้านร้าง", content:"" },
      { title:"บทที่ 2 — เสียงในความมืด", content:"" },
      { title:"บทที่ 3 — ความจริงที่น่าสยดสยอง", content:"" },
    ],
    writingGoal: 800,
  },
  {
    id: "thriller",
    icon: "⚡", label: "ระทึกขวัญ", labelEn: "Thriller",
    desc: "ความตึงเครียด ไล่ล่า ตัวร้าย แอ็กชัน เอาตัวรอด",
    color: "#dc2626",
    settings: {
      font:"Sarabun", fontSize:13, lineHeight:175, marginV:44, marginH:40,
      textAlign:"justify", dropCap:false, layout:"a5", theme:"white",
      coverTemplate:"dark",
      divider:"—",
      dividerDecor:{ type:"text" },
      tocStyle:{
        template:"modern", headingText:"สารบัญ", headingAlign:"left",
        showPageNumbers:true, leaderChar:"space", showBorderBottom:false, pageNumColor:"muted",
        decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" },
      },
      chapterHeaderStyle:{
        style:"plain", bgColor:"none", bgSolidColor:"#1a1612",
        bgGradient:"linear-gradient(135deg,#1a1612,#2a0a0a)",
        bgOverlay:40, frameStyle:"none", ornament:"none", ornamentId:"simple_line",
        textColor:"auto", height:80,
      },
      pageBorder:{ enabled:false, style:"single", color:"custom", customColor:"#dc2626", width:1, radius:0, inset:8 },
    },
    book: { genre:"ระทึกขวัญ", targetAudience:"ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — นาทีวิกฤต", content:"" },
      { title:"บทที่ 2 — ผู้ไล่ตาม", content:"" },
      { title:"บทที่ 3 — ไม่มีทางออก", content:"" },
    ],
    writingGoal: 1200,
  },
  {
    id: "historical",
    icon: "🏯", label: "อิงประวัติศาสตร์", labelEn: "Historical",
    desc: "ยุคสมัยโบราณ ราชสำนัก สงคราม วัฒนธรรมเก่า",
    color: "#92400e",
    settings: {
      font:"Noto Serif Thai", fontSize:15, lineHeight:200, marginV:60, marginH:56,
      textAlign:"justify", dropCap:true, layout:"a5", theme:"sepia",
      coverTemplate:"ivory",
      divider:"❧ ❧",
      dividerDecor:{ type:"svg", svgId:"lotus" },
      tocStyle:{
        template:"elegant", headingText:"สารบัญ", headingAlign:"center",
        showPageNumbers:true, leaderChar:"line", showBorderBottom:true, pageNumColor:"accent",
        decor:{ headingFrame:"ornate", headingBg:"none", cornerOrnament:"none" },
      },
      chapterHeaderStyle:{
        style:"banner", bgColor:"gradient", bgSolidColor:"#3d2010",
        bgGradient:"linear-gradient(135deg,#2a1500,#5c3010)",
        bgOverlay:30, frameStyle:"ornate", ornament:"show", ornamentId:"royal_border",
        textColor:"auto", height:125,
      },
      pageBorder:{ enabled:true, style:"double", color:"accent", customColor:"#92400e", width:1, radius:0, inset:12 },
    },
    book: { genre:"อิงประวัติศาสตร์", targetAudience:"ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"บทนำ — ยุคสมัย", content:"" },
      { title:"บทที่ 1 — ราชสำนัก", content:"" },
      { title:"บทที่ 2 — แผนการ", content:"" },
      { title:"บทที่ 3 — สงคราม", content:"" },
    ],
    writingGoal: 1500,
  },
  {
    id: "isekai",
    icon: "🌀", label: "อิเซไก", labelEn: "Isekai",
    desc: "ตกไปโลกอื่น เกมเมอร์ ระบบ Status ตัวเอกที่แกร่ง",
    color: "#7c3aed",
    settings: {
      font:"Kanit", fontSize:15, lineHeight:185, marginV:50, marginH:46,
      textAlign:"left", dropCap:false, layout:"a5", theme:"dark",
      coverTemplate:"anime_dark",
      divider:"✦✦✦",
      dividerDecor:{ type:"text" },
      tocStyle:{
        template:"boxed", headingText:"สารบัญ", headingAlign:"left",
        showPageNumbers:true, leaderChar:"dots", showBorderBottom:false, pageNumColor:"accent",
        decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" },
      },
      chapterHeaderStyle:{
        style:"split", bgColor:"gradient", bgSolidColor:"#0e001e",
        bgGradient:"linear-gradient(135deg,#0e001e,#1a0040)",
        bgOverlay:25, frameStyle:"none", ornament:"none", ornamentId:"simple_line",
        textColor:"auto", height:110,
      },
      pageBorder:{ enabled:false, style:"single", color:"accent", customColor:"#7c3aed", width:1, radius:0, inset:8 },
    },
    book: { genre:"อิเซไก/แฟนตาซี", targetAudience:"วัยรุ่น-ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — วันสุดท้ายในโลกเดิม", content:"" },
      { title:"บทที่ 2 — ตื่นขึ้นในโลกใหม่", content:"" },
      { title:"บทที่ 3 — ระบบ Status", content:"" },
      { title:"บทที่ 4 — ภารกิจแรก", content:"" },
    ],
    writingGoal: 1000,
  },
  {
    id: "yaoi_yuri",
    icon: "🌸", label: "วาย/ยูริ", labelEn: "BL / GL",
    desc: "นิยายวาย ความสัมพันธ์ชาย-ชาย หรือ หญิง-หญิง",
    color: "#db2777",
    settings: {
      font:"Sarabun", fontSize:16, lineHeight:200, marginV:60, marginH:56,
      textAlign:"justify", dropCap:true, layout:"a5", theme:"white",
      coverTemplate:"sakura",
      divider:"✿✿✿",
      dividerDecor:{ type:"svg", svgId:"floral_vine" },
      tocStyle:{
        template:"elegant", headingText:"สารบัญ", headingAlign:"center",
        showPageNumbers:true, leaderChar:"line", showBorderBottom:true, pageNumColor:"accent",
        decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" },
      },
      chapterHeaderStyle:{
        style:"framed", bgColor:"gradient", bgSolidColor:"#1a0010",
        bgGradient:"linear-gradient(135deg,#1a0010,#4a1030)",
        bgOverlay:20, frameStyle:"simple", ornament:"show", ornamentId:"floral_vine",
        textColor:"auto", height:110,
      },
      pageBorder:{ enabled:true, style:"single", color:"custom", customColor:"#db2777", width:1, radius:4, inset:10 },
    },
    book: { genre:"วาย/ยูริ", targetAudience:"ผู้ใหญ่ 18+", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — ชะตาพบกัน", content:"" },
      { title:"บทที่ 2 — ความรู้สึกที่ซ่อนเร้น", content:"" },
      { title:"บทที่ 3 — สารภาพ", content:"" },
    ],
    writingGoal: 1000,
  },
  {
    id: "action",
    icon: "⚔️", label: "แอ็กชัน", labelEn: "Action",
    desc: "ต่อสู้ คิกบ็อกซิ่ง มาร์เชียลอาร์ต พลังพิเศษ",
    color: "#ea580c",
    settings: {
      font:"Kanit", fontSize:15, lineHeight:180, marginV:48, marginH:44,
      textAlign:"justify", dropCap:false, layout:"a5", theme:"dark",
      coverTemplate:"dark",
      divider:"✦✦✦",
      dividerDecor:{ type:"text" },
      tocStyle:{ template:"boxed", headingText:"สารบัญ", headingAlign:"left", showPageNumbers:true, leaderChar:"dots", showBorderBottom:false, pageNumColor:"accent", decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" } },
      chapterHeaderStyle:{ style:"banner", bgColor:"gradient", bgSolidColor:"#1a0a00", bgGradient:"linear-gradient(135deg,#1a0a00,#3a1500)", bgOverlay:30, frameStyle:"none", ornament:"none", ornamentId:"simple_line", textColor:"auto", height:105 },
      pageBorder:{ enabled:false, style:"single", color:"accent", customColor:"#ea580c", width:1, radius:0, inset:8 },
    },
    book: { genre:"แอ็กชัน", targetAudience:"วัยรุ่น-ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — นักสู้", content:"" },
      { title:"บทที่ 2 — ศัตรูตัวแรก", content:"" },
      { title:"บทที่ 3 — การฝึกฝน", content:"" },
      { title:"บทที่ 4 — การต่อสู้ครั้งสำคัญ", content:"" },
    ],
    writingGoal: 1200,
  },
  {
    id: "slice_of_life",
    icon: "☕", label: "ชีวิตประจำวัน", labelEn: "Slice of Life",
    desc: "เรื่องราวธรรมดา ความอบอุ่น ครอบครัว มิตรภาพ",
    color: "#059669",
    settings: {
      font:"Sarabun", fontSize:16, lineHeight:205, marginV:62, marginH:58,
      textAlign:"justify", dropCap:true, layout:"a5", theme:"white",
      coverTemplate:"ivory",
      divider:"~ ~ ~",
      dividerDecor:{ type:"text" },
      tocStyle:{ template:"classic", headingText:"สารบัญ", headingAlign:"center", showPageNumbers:true, leaderChar:"dots", showBorderBottom:true, pageNumColor:"accent", decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" } },
      chapterHeaderStyle:{ style:"plain", bgColor:"none", bgSolidColor:"#f5ede0", bgGradient:"linear-gradient(135deg,#f5ede0,#e8d5c0)", bgOverlay:10, frameStyle:"none", ornament:"none", ornamentId:"simple_line", textColor:"auto", height:80 },
      pageBorder:{ enabled:false, style:"single", color:"accent", customColor:"#059669", width:1, radius:0, inset:8 },
    },
    book: { genre:"ชีวิตประจำวัน", targetAudience:"ทุกวัย", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — เช้าวันธรรมดา", content:"" },
      { title:"บทที่ 2 — เพื่อนเก่า", content:"" },
      { title:"บทที่ 3 — วันพักผ่อน", content:"" },
    ],
    writingGoal: 600,
  },
  {
    id: "psychological",
    icon: "🧠", label: "จิตวิทยา", labelEn: "Psychological",
    desc: "จิตใจ ความบิดเบี้ยว ตัวร้ายที่ซับซ้อน โลกภายใน",
    color: "#4f46e5",
    settings: {
      font:"Noto Serif Thai", fontSize:14, lineHeight:188, marginV:52, marginH:50,
      textAlign:"justify", dropCap:false, layout:"a5", theme:"white",
      coverTemplate:"slate",
      divider:"§",
      dividerDecor:{ type:"text" },
      tocStyle:{ template:"modern", headingText:"สารบัญ", headingAlign:"left", showPageNumbers:true, leaderChar:"space", showBorderBottom:false, pageNumColor:"muted", decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" } },
      chapterHeaderStyle:{ style:"split", bgColor:"gradient", bgSolidColor:"#1c1c24", bgGradient:"linear-gradient(135deg,#0a0a14,#1c1c2e)", bgOverlay:40, frameStyle:"none", ornament:"none", ornamentId:"simple_line", textColor:"auto", height:100 },
      pageBorder:{ enabled:false, style:"single", color:"accent", customColor:"#4f46e5", width:1, radius:0, inset:8 },
    },
    book: { genre:"จิตวิทยา", targetAudience:"ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — จิตใจที่แตกสลาย", content:"" },
      { title:"บทที่ 2 — ความจริงครึ่งเดียว", content:"" },
      { title:"บทที่ 3 — เส้นแบ่งที่เลือนราง", content:"" },
    ],
    writingGoal: 1000,
  },
  {
    id: "adventure",
    icon: "🗺️", label: "ผจญภัย", labelEn: "Adventure",
    desc: "การเดินทาง แผนที่ สมบัติ การค้นพบโลกใหม่",
    color: "#d97706",
    settings: {
      font:"Sarabun", fontSize:15, lineHeight:188, marginV:52, marginH:48,
      textAlign:"justify", dropCap:false, layout:"a5", theme:"white",
      coverTemplate:"forest",
      divider:"⊱ ── ⊰",
      dividerDecor:{ type:"svg", svgId:"feather" },
      tocStyle:{ template:"classic", headingText:"สารบัญ", headingAlign:"center", showPageNumbers:true, leaderChar:"dots", showBorderBottom:true, pageNumColor:"accent", decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" } },
      chapterHeaderStyle:{ style:"banner", bgColor:"gradient", bgSolidColor:"#0d2016", bgGradient:"linear-gradient(135deg,#0d2016,#1e5c38)", bgOverlay:25, frameStyle:"none", ornament:"show", ornamentId:"feather", textColor:"auto", height:115 },
      pageBorder:{ enabled:false, style:"single", color:"accent", customColor:"#d97706", width:1, radius:0, inset:8 },
    },
    book: { genre:"ผจญภัย", targetAudience:"วัยรุ่น-ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — แผนที่ลึกลับ", content:"" },
      { title:"บทที่ 2 — การเดินทางเริ่มต้น", content:"" },
      { title:"บทที่ 3 — อุปสรรคแรก", content:"" },
      { title:"บทที่ 4 — ค้นพบ", content:"" },
    ],
    writingGoal: 1000,
  },
  {
    id: "comedy",
    icon: "😂", label: "ตลก/ฮาเลือด", labelEn: "Comedy",
    desc: "ขำขัน สถานการณ์ไร้สาระ ตัวละครตลก ครื้นเครง",
    color: "#f59e0b",
    settings: {
      font:"Mitr", fontSize:16, lineHeight:195, marginV:56, marginH:52,
      textAlign:"left", dropCap:false, layout:"a5", theme:"white",
      coverTemplate:"ivory",
      divider:"~ ~ ~",
      dividerDecor:{ type:"text" },
      tocStyle:{ template:"magazine", headingText:"สารบัญ", headingAlign:"left", showPageNumbers:false, leaderChar:"space", showBorderBottom:false, pageNumColor:"muted", decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" } },
      chapterHeaderStyle:{ style:"plain", bgColor:"none", bgSolidColor:"#fffbf0", bgGradient:"linear-gradient(135deg,#fffbf0,#fff3d0)", bgOverlay:10, frameStyle:"none", ornament:"none", ornamentId:"simple_line", textColor:"auto", height:75 },
      pageBorder:{ enabled:false, style:"single", color:"accent", customColor:"#f59e0b", width:1, radius:0, inset:8 },
    },
    book: { genre:"ตลก/ฮา", targetAudience:"ทุกวัย", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — วันที่แย่ที่สุด", content:"" },
      { title:"บทที่ 2 — เรื่องยิ่งยุ่ง", content:"" },
      { title:"บทที่ 3 — ทุกอย่างพังพินาศ (แต่ตลกมาก)", content:"" },
    ],
    writingGoal: 700,
  },
  {
    id: "drama",
    icon: "🎭", label: "ดราม่า", labelEn: "Drama",
    desc: "อารมณ์เข้ม ความขัดแย้ง ครอบครัว สังคม น้ำตา",
    color: "#0891b2",
    settings: {
      font:"Noto Serif Thai", fontSize:16, lineHeight:200, marginV:62, marginH:58,
      textAlign:"justify", dropCap:true, layout:"a5", theme:"white",
      coverTemplate:"navy",
      divider:"—",
      dividerDecor:{ type:"text" },
      tocStyle:{ template:"elegant", headingText:"สารบัญ", headingAlign:"center", showPageNumbers:true, leaderChar:"line", showBorderBottom:true, pageNumColor:"accent", decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" } },
      chapterHeaderStyle:{ style:"framed", bgColor:"gradient", bgSolidColor:"#0a1628", bgGradient:"linear-gradient(135deg,#0a1628,#1a3a5c)", bgOverlay:30, frameStyle:"simple", ornament:"none", ornamentId:"simple_line", textColor:"auto", height:115 },
      pageBorder:{ enabled:false, style:"single", color:"accent", customColor:"#0891b2", width:1, radius:0, inset:8 },
    },
    book: { genre:"ดราม่า", targetAudience:"ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — ครอบครัวที่แตกร้าว", content:"" },
      { title:"บทที่ 2 — ความลับ", content:"" },
      { title:"บทที่ 3 — การเผชิญหน้า", content:"" },
    ],
    writingGoal: 900,
  },
  {
    id: "sports",
    icon: "🏆", label: "กีฬา", labelEn: "Sports",
    desc: "นักกีฬา การแข่งขัน ความพ่ายแพ้ ชัยชนะ ทีมเวิร์ก",
    color: "#16a34a",
    settings: {
      font:"Kanit", fontSize:15, lineHeight:183, marginV:50, marginH:44,
      textAlign:"left", dropCap:false, layout:"a5", theme:"white",
      coverTemplate:"forest",
      divider:"—",
      dividerDecor:{ type:"text" },
      tocStyle:{ template:"boxed", headingText:"สารบัญ", headingAlign:"left", showPageNumbers:true, leaderChar:"dots", showBorderBottom:false, pageNumColor:"accent", decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" } },
      chapterHeaderStyle:{ style:"banner", bgColor:"gradient", bgSolidColor:"#052e16", bgGradient:"linear-gradient(135deg,#052e16,#14532d)", bgOverlay:20, frameStyle:"none", ornament:"none", ornamentId:"simple_line", textColor:"auto", height:100 },
      pageBorder:{ enabled:false, style:"single", color:"accent", customColor:"#16a34a", width:1, radius:0, inset:8 },
    },
    book: { genre:"กีฬา", targetAudience:"วัยรุ่น-ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — รุกกี้", content:"" },
      { title:"บทที่ 2 — เส้นทางสู่จุดสูงสุด", content:"" },
      { title:"บทที่ 3 — การแข่งขัน", content:"" },
      { title:"บทที่ 4 — ชัยชนะ", content:"" },
    ],
    writingGoal: 1000,
  },
  {
    id: "cultivation",
    icon: "🌙", label: "เซียน/ฝึกวิทยายุทธ์", labelEn: "Cultivation / Wuxia",
    desc: "ฝึกพลังภายใน ระดับชั้น เซียน การต่อสู้ภูเขาหิมะ",
    color: "#0f766e",
    settings: {
      font:"Noto Serif Thai", fontSize:15, lineHeight:190, marginV:52, marginH:48,
      textAlign:"justify", dropCap:false, layout:"a5", theme:"dark",
      coverTemplate:"forest",
      divider:"〰〰〰",
      dividerDecor:{ type:"svg", svgId:"lotus" },
      tocStyle:{ template:"dark_novel", headingText:"สารบัญ", headingAlign:"left", showPageNumbers:true, leaderChar:"dashes", showBorderBottom:false, pageNumColor:"accent", decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" } },
      chapterHeaderStyle:{ style:"full_width", bgColor:"gradient", bgSolidColor:"#022c22", bgGradient:"linear-gradient(135deg,#022c22,#064e3b)", bgOverlay:35, frameStyle:"none", ornament:"show", ornamentId:"lotus", textColor:"auto", height:125 },
      pageBorder:{ enabled:false, style:"single", color:"accent", customColor:"#0f766e", width:1, radius:0, inset:8 },
    },
    book: { genre:"เซียน/วูเซีย", targetAudience:"วัยรุ่น-ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — พรสวรรค์ที่ซ่อนอยู่", content:"" },
      { title:"บทที่ 2 — สำนักเก่าแก่", content:"" },
      { title:"บทที่ 3 — ระดับชั้นแรก", content:"" },
      { title:"บทที่ 4 — คู่ปรับ", content:"" },
    ],
    writingGoal: 1500,
  },
  {
    id: "dystopia",
    icon: "🏙️", label: "ดิสโทเปีย", labelEn: "Dystopia",
    desc: "โลกอนาคตมืดหม่น รัฐบาลเผด็จการ การต่อต้าน การปฏิวัติ",
    color: "#64748b",
    settings: {
      font:"Sarabun", fontSize:13, lineHeight:178, marginV:46, marginH:42,
      textAlign:"left", dropCap:false, layout:"a5", theme:"dark",
      coverTemplate:"slate",
      divider:"···",
      dividerDecor:{ type:"text" },
      tocStyle:{ template:"modern", headingText:"INDEX", headingAlign:"left", showPageNumbers:true, leaderChar:"space", showBorderBottom:false, pageNumColor:"muted", decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" } },
      chapterHeaderStyle:{ style:"plain", bgColor:"solid", bgSolidColor:"#1c1c24", bgGradient:"linear-gradient(135deg,#0a0a12,#1c1c24)", bgOverlay:50, frameStyle:"none", ornament:"none", ornamentId:"simple_line", textColor:"auto", height:85 },
      pageBorder:{ enabled:false, style:"single", color:"accent", customColor:"#64748b", width:1, radius:0, inset:8 },
    },
    book: { genre:"ดิสโทเปีย/ไซไฟ", targetAudience:"ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — กฎแห่งโลกใหม่", content:"" },
      { title:"บทที่ 2 — คนนอกระบบ", content:"" },
      { title:"บทที่ 3 — กลุ่มใต้ดิน", content:"" },
      { title:"บทที่ 4 — การปฏิวัติ", content:"" },
    ],
    writingGoal: 1200,
  },
  {
    id: "short_story",
    icon: "📄", label: "เรื่องสั้น", labelEn: "Short Story",
    desc: "เรื่องสั้น 1–3 บท ตอนจบชัดเจน เน้นความกระชับ",
    color: "#6b7280",
    settings: {
      font:"Prompt", fontSize:16, lineHeight:200, marginV:64, marginH:62,
      textAlign:"justify", dropCap:true, layout:"a5", theme:"white",
      coverTemplate:"ivory",
      divider:"⁂",
      dividerDecor:{ type:"text" },
      tocStyle:{ template:"magazine", headingText:"สารบัญ", headingAlign:"left", showPageNumbers:false, leaderChar:"space", showBorderBottom:false, pageNumColor:"muted", decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" } },
      chapterHeaderStyle:{ style:"plain", bgColor:"none", bgSolidColor:"#f5ede0", bgGradient:"linear-gradient(135deg,#f5ede0,#ddd0bc)", bgOverlay:10, frameStyle:"none", ornament:"none", ornamentId:"simple_line", textColor:"auto", height:70 },
      pageBorder:{ enabled:false, style:"single", color:"accent", customColor:"#6b7280", width:1, radius:0, inset:8 },
    },
    book: { genre:"เรื่องสั้น", targetAudience:"ทุกวัย", language:"ไทย" },
    chapters: [
      { title:"ตอนที่ 1", content:"" },
      { title:"ตอนที่ 2", content:"" },
    ],
    writingGoal: 300,
  },
  // ── เพิ่มใน V10 ─────────────────────────────────────────────────────────────
  {
    id: "system_litrpg",
    icon: "⚙️", label: "System / LitRPG", labelEn: "System / LitRPG",
    desc: "ระบบ Status, Skill, Level Up, Dungeon, ตัวเลขพลัง แบบเกม",
    color: "#0891b2",
    category: "fantasy",
    settings: {
      font:"Kanit", fontSize:14, lineHeight:182, marginV:48, marginH:44,
      textAlign:"left", dropCap:false, layout:"a5", theme:"dark",
      coverTemplate:"anime_dark",
      divider:"✦✦✦",
      dividerDecor:{ type:"text" },
      tocStyle:{ template:"boxed", headingText:"[ CONTENTS ]", headingAlign:"left", showPageNumbers:true, leaderChar:"dots", showBorderBottom:false, pageNumColor:"accent", decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" } },
      chapterHeaderStyle:{ style:"split", bgColor:"gradient", bgSolidColor:"#020617", bgGradient:"linear-gradient(135deg,#020617,#0c1445)", bgOverlay:20, frameStyle:"none", ornament:"none", ornamentId:"simple_line", textColor:"auto", height:105 },
      pageBorder:{ enabled:false, style:"single", color:"accent", customColor:"#0891b2", width:1, radius:0, inset:8 },
    },
    book: { genre:"System/LitRPG", targetAudience:"วัยรุ่น-ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — [System Initialized]", content:"" },
      { title:"บทที่ 2 — First Quest", content:"" },
      { title:"บทที่ 3 — Level Up!", content:"" },
      { title:"บทที่ 4 — Boss Encounter", content:"" },
    ],
    writingGoal: 1200,
  },
  {
    id: "apocalypse",
    icon: "☢️", label: "อวสานโลก", labelEn: "Post-Apocalypse",
    desc: "โลกหลังหายนะ ซอมบี้ ไวรัส นิวเคลียร์ การเอาตัวรอด",
    color: "#7f1d1d",
    category: "thriller",
    settings: {
      font:"Sarabun", fontSize:14, lineHeight:178, marginV:46, marginH:42,
      textAlign:"justify", dropCap:false, layout:"a5", theme:"dark",
      coverTemplate:"horror",
      divider:"* * *",
      dividerDecor:{ type:"text" },
      tocStyle:{ template:"dark_novel", headingText:"สารบัญ", headingAlign:"left", showPageNumbers:true, leaderChar:"dashes", showBorderBottom:false, pageNumColor:"ink", decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" } },
      chapterHeaderStyle:{ style:"full_width", bgColor:"gradient", bgSolidColor:"#1a0000", bgGradient:"linear-gradient(135deg,#0a0000,#2a0000)", bgOverlay:60, frameStyle:"none", ornament:"none", ornamentId:"simple_line", textColor:"auto", height:120 },
      pageBorder:{ enabled:false, style:"single", color:"custom", customColor:"#7f1d1d", width:1, radius:0, inset:8 },
    },
    book: { genre:"อวสานโลก/Apocalypse", targetAudience:"ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — วันสุดท้ายของอารยธรรม", content:"" },
      { title:"บทที่ 2 — ผู้รอดชีวิต", content:"" },
      { title:"บทที่ 3 — เขตปลอดภัย", content:"" },
      { title:"บทที่ 4 — ภัยคุกคามใหม่", content:"" },
    ],
    writingGoal: 1200,
  },
  {
    id: "omegaverse",
    icon: "🐺", label: "Omegaverse", labelEn: "Omegaverse",
    desc: "Alpha/Beta/Omega, ABO Dynamics, Heat, Mating Bond, สังคมทางเลือก",
    color: "#7c3aed",
    category: "romance",
    settings: {
      font:"Sarabun", fontSize:16, lineHeight:198, marginV:58, marginH:54,
      textAlign:"justify", dropCap:true, layout:"a5", theme:"white",
      coverTemplate:"galaxy",
      divider:"✿✿✿",
      dividerDecor:{ type:"svg", svgId:"wave_ornament" },
      tocStyle:{ template:"elegant", headingText:"สารบัญ", headingAlign:"center", showPageNumbers:true, leaderChar:"line", showBorderBottom:true, pageNumColor:"accent", decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" } },
      chapterHeaderStyle:{ style:"framed", bgColor:"gradient", bgSolidColor:"#1a0040", bgGradient:"linear-gradient(135deg,#0e001e,#2a0060)", bgOverlay:20, frameStyle:"simple", ornament:"show", ornamentId:"wave_ornament", textColor:"auto", height:110 },
      pageBorder:{ enabled:true, style:"single", color:"custom", customColor:"#7c3aed", width:1, radius:4, inset:10 },
    },
    book: { genre:"Omegaverse", targetAudience:"ผู้ใหญ่ 18+", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — กลิ่นอาย", content:"" },
      { title:"บทที่ 2 — ปฏิกิริยา", content:"" },
      { title:"บทที่ 3 — การผูกพัน", content:"" },
    ],
    writingGoal: 1000,
  },
  {
    id: "dark_fantasy",
    icon: "🩸", label: "Dark Fantasy", labelEn: "Dark Fantasy",
    desc: "โลกมืด ปีศาจ การค้นหาความหมาย ศีลธรรมสีเทา ไม่มีฮีโร่แท้จริง",
    color: "#450a0a",
    includes: ["Morality System", "Faction Politics", "Dark World Lore", "3 ตัวละครศีลธรรมสีเทา"],
    category: "fantasy",
    settings: {
      font:"Noto Serif Thai", fontSize:14, lineHeight:183, marginV:50, marginH:46,
      textAlign:"justify", dropCap:false, layout:"a5", theme:"dark",
      coverTemplate:"horror",
      divider:"⁂",
      dividerDecor:{ type:"svg", svgId:"celtic_knot" },
      tocStyle:{
        template:"dark_novel", headingText:"สารบัญ", headingAlign:"left",
        showPageNumbers:true, leaderChar:"dashes", showBorderBottom:false, pageNumColor:"ink",
        decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" },
      },
      chapterHeaderStyle:{
        style:"full_width", bgColor:"solid", bgSolidColor:"#0a0000",
        bgGradient:"linear-gradient(135deg,#000000,#1a0000)",
        bgOverlay:60, frameStyle:"none", ornament:"none", ornamentId:"simple_line",
        textColor:"auto", height:140,
      },
      pageBorder:{ enabled:false, style:"single", color:"custom", customColor:"#450a0a", width:1, radius:0, inset:8 },
    },
    book: { genre:"Dark Fantasy", targetAudience:"ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — โลกที่ไม่มีแสงสว่าง", content:"" },
      { title:"บทที่ 2 — ราคาแห่งอำนาจ", content:"" },
      { title:"บทที่ 3 — ศัตรูหรือพันธมิตร?", content:"" },
      { title:"บทที่ 4 — ในความมืด", content:"" },
    ],
    writingGoal: 1500,
    characters: [
      { name:"ตัวเอก (สีเทา)", age:"30", role:"พระเอก", status:"มีชีวิต", appearsIn:"เล่ม 1", notes:"ไม่ใช่ฮีโร่ ไม่ใช่ผู้ร้าย / ทำสิ่งชั่วเพื่อผลดี / Moral Code: ปกป้องคนที่รัก ไม่ว่าต้องแลกด้วยอะไร", gender:"ไม่ระบุ", faction:"ไม่มี", color:"#450a0a" },
      { name:"พันธมิตรที่น่าสงสัย", age:"Unknown", role:"พระรอง", status:"มีชีวิต", appearsIn:"เล่ม 1", notes:"ช่วยตัวเอก แต่มีวาระซ่อนเร้น / อาจเป็นศัตรูในอนาคต", gender:"ไม่ระบุ", faction:"The Void Cult", color:"#7c3aed" },
      { name:"ผู้พิทักษ์ศีลธรรม", age:"45", role:"ผู้ร้ายหลัก", status:"มีชีวิต", appearsIn:"เล่ม 1", notes:"เชื่อมั่นในความดี 100% จึงโหดร้ายไม่มีข้อยกเว้น / Antagonist ที่มีเหตุผล", gender:"หญิง", faction:"The Holy Order", color:"#92400e" },
    ],
    worldPreset: {
      locations: [
        { name:"เมือง Ashveil", desc:"เมืองใต้การปกครองของ Holy Order กฎเหล็กมาก คนจนถูกกดขี่", type:"สถานที่หลัก" },
        { name:"The Undercity", desc:"ใต้ดิน สังคมคนนอกกฎหมาย มีเสรีภาพแต่อันตราย", type:"สถานที่สำคัญ" },
        { name:"Blighted Wastes", desc:"ดินแดนที่เวทมนตร์มืดทำลาย ไม่มีชีวิต แต่มีคำตอบ", type:"สถานที่อันตราย" },
      ],
      organizations: [
        { name:"The Holy Order", desc:"ผู้ปกครอง ศีลธรรมตายตัว ไม่มีข้อยกเว้น — ดีหรือชั่ว ขึ้นอยู่กับมุมมอง", alignment:"เป็นกลาง" },
        { name:"The Void Cult", desc:"นับถือความมืด มองว่าทุกอย่างสมดุล ไม่มีดีหรือชั่วแท้จริง", alignment:"เป็นกลาง" },
        { name:"The Forgotten", desc:"คนที่ระบบทิ้ง ต่อสู้เพื่อเอาตัวรอด ไม่ใช่ฮีโร่", alignment:"เป็นกลาง" },
      ],
      lore: [
        { title:"Morality System", desc:"ไม่มีดี-ชั่วสัมบูรณ์ ทุกตัวละครมี 'ราคา' ที่ยอมจ่าย ติดตาม: ตัวเอกแลกอะไรไปแล้วบ้าง?" },
        { title:"Magic = Corruption", desc:"เวทมนตร์ทุกครั้งกัดกินจิตใจ ยิ่งใช้มาก ยิ่งสูญเสียความเป็นมนุษย์" },
        { title:"ประวัติโลก", desc:"โลกเคยสว่างสดใส — เมื่อ 200 ปีก่อน 'The Sundering' เกิดขึ้น ทุกอย่างพังทลาย ไม่มีใครรู้สาเหตุที่แท้จริง" },
      ],
    },
  },
  {
    id: "manhwa",
    icon: "🎌", label: "Manhwa / Webtoon", labelEn: "Manhwa / Webtoon",
    desc: "สไตล์เกาหลี Webtoon แบบ Scroll ตัวละครแข็งแกร่ง ดีไซน์เก๋",
    color: "#0f172a",
    category: "fantasy",
    settings: {
      font:"Kanit", fontSize:14, lineHeight:185, marginV:48, marginH:40,
      textAlign:"left", dropCap:false, layout:"a5", theme:"dark",
      coverTemplate:"slate",
      divider:"—",
      dividerDecor:{ type:"text" },
      tocStyle:{ template:"boxed", headingText:"CHAPTERS", headingAlign:"left", showPageNumbers:true, leaderChar:"dots", showBorderBottom:false, pageNumColor:"accent", decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" } },
      chapterHeaderStyle:{ style:"banner", bgColor:"gradient", bgSolidColor:"#0f172a", bgGradient:"linear-gradient(135deg,#0f172a,#1e293b)", bgOverlay:20, frameStyle:"none", ornament:"none", ornamentId:"simple_line", textColor:"auto", height:115 },
      pageBorder:{ enabled:false, style:"single", color:"accent", customColor:"#0f172a", width:1, radius:0, inset:8 },
    },
    book: { genre:"Manhwa/Webtoon", targetAudience:"วัยรุ่น-ผู้ใหญ่", language:"ไทย" },
    chapters: [
      { title:"Chapter 1 — Awakening", content:"" },
      { title:"Chapter 2 — Hidden Power", content:"" },
      { title:"Chapter 3 — The Test", content:"" },
      { title:"Chapter 4 — Rising", content:"" },
    ],
    writingGoal: 1000,
  },
  {
    id: "cozy_magic",
    icon: "🧙", label: "Cozy Magic", labelEn: "Cozy / Slice-of-Magic",
    desc: "เวทมนตร์ในชีวิตประจำวัน ร้านกาแฟ สมุนไพร บรรยากาศอบอุ่น",
    color: "#6d28d9",
    category: "slice",
    settings: {
      font:"Charm", fontSize:16, lineHeight:205, marginV:62, marginH:58,
      textAlign:"justify", dropCap:true, layout:"a5", theme:"white",
      coverTemplate:"forest",
      divider:"❦",
      dividerDecor:{ type:"svg", svgId:"floral_vine" },
      tocStyle:{ template:"classic", headingText:"สารบัญ", headingAlign:"center", showPageNumbers:true, leaderChar:"dots", showBorderBottom:true, pageNumColor:"accent", decor:{ headingFrame:"none", headingBg:"none", cornerOrnament:"none" } },
      chapterHeaderStyle:{ style:"framed", bgColor:"gradient", bgSolidColor:"#1a1f0a", bgGradient:"linear-gradient(135deg,#1a1f0a,#2d3a14)", bgOverlay:15, frameStyle:"simple", ornament:"show", ornamentId:"floral_vine", textColor:"auto", height:105 },
      pageBorder:{ enabled:true, style:"single", color:"custom", customColor:"#6d28d9", width:1, radius:6, inset:12 },
    },
    book: { genre:"Cozy Magic/Fantasy", targetAudience:"ทุกวัย", language:"ไทย" },
    chapters: [
      { title:"บทที่ 1 — ร้านเล็กๆ ริมถนน", content:"" },
      { title:"บทที่ 2 — ลูกค้าคนแรก", content:"" },
      { title:"บทที่ 3 — ความลับของวัตถุดิบ", content:"" },
    ],
    writingGoal: 700,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "blank",
    icon: "✨", label: "เปล่า / กำหนดเอง", labelEn: "Blank",
    desc: "ไม่มี Template — เริ่มต้นจากหน้ากระดาษเปล่า",
    color: "#9ca3af",
    includes: ["ไม่มี Starter Content", "ตั้งค่าทุกอย่างเอง", "เหมาะกับนักเขียนที่มีแนวคิดแล้ว"],
    category: "other",
    settings: {},
    book: {},
    chapters: [],
    writingGoal: 500,
    characters: [],
    worldPreset: {
      locations: [],
      organizations: [],
      lore: [],
    },
  },
];

// ─── TEMPLATE CATEGORIES ─────────────────────────────────────────────────────
const TEMPLATE_CATEGORIES = [
  { id:"all",     label:"ทั้งหมด",      icon:"✦" },
  { id:"romance", label:"โรแมนซ์/วาย",  icon:"💕" },
  { id:"fantasy", label:"แฟนตาซี/Sci-Fi",icon:"🐉" },
  { id:"thriller",label:"ระทึก/สยอง",   icon:"⚡" },
  { id:"slice",   label:"ชีวิต/ฮา",     icon:"☕" },
  { id:"other",   label:"อื่นๆ",         icon:"📄" },
  { id:"custom",  label:"Custom ของฉัน", icon:"⭐" },
];

// Assign default categories to templates that don't have one
const NOVEL_TEMPLATES_WITH_CAT = NOVEL_TEMPLATES.map(t => {
  if (t.category) return t;
  const catMap = {
    romance:"romance", yaoi_yuri:"romance",
    fantasy:"fantasy", scifi:"fantasy", isekai:"fantasy", cultivation:"fantasy", dystopia:"fantasy", action:"fantasy",
    mystery:"thriller", horror:"thriller", thriller:"thriller", psychological:"thriller",
    slice_of_life:"slice", comedy:"slice", sports:"slice",
    historical:"other", adventure:"other", drama:"other", short_story:"other",
    blank:"other",
  };
  return { ...t, category: catMap[t.id] || "other" };
});

// ─── CUSTOM TEMPLATE STORAGE ─────────────────────────────────────────────────
const CUSTOM_TPL_KEY = "novelforge_custom_templates";

function loadCustomTemplates() {
  try {
    const raw = localStorage.getItem(CUSTOM_TPL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveCustomTemplates(list) {
  try { localStorage.setItem(CUSTOM_TPL_KEY, JSON.stringify(list)); } catch {}
}

function newProject(overrides = {}) {
  const id = newId();
  return {
    id,
    name: overrides.name || "โปรเจกต์ใหม่",
    book: defaultBook(),
    settings: defaultSettings(),
    chapters: defaultChapters(),
    characters: defaultCharacters(),
    timeline: defaultTimeline(),
    world: defaultWorldBible(),
    specialPages: defaultSpecialPages(),
    bookStructure: defaultBookStructure(id),
    writingGoal: 500,
    seriesId: null,   // V25: series membership
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: "8",
    ...overrides,
  };
}

// ─── SERIES DATA MODEL ────────────────────────────────────────────────────────
// Series = ชุดนิยายข้ามเล่ม เก็บใน IndexedDB store "series" แยกจาก projects
function newSeries(overrides = {}) {
  return {
    id:          newId(),
    title:       overrides.title       || "ชื่อชุดนิยาย",
    desc:        overrides.desc        || "",
    coverColor:  overrides.coverColor  || "#8b4513",
    bookIds:     overrides.bookIds     || [],   // อาร์เรย์ project.id ตามลำดับ
    seriesBible: overrides.seriesBible || defaultSeriesBible(),
    createdAt:   new Date().toISOString(),
    updatedAt:   new Date().toISOString(),
    ...overrides,
  };
}

function defaultSeriesBible() {
  return {
    // Bible tab: กฎโลก / ระบบ / Canon
    rules: [],          // [{ id, title, content }]
    // Consistency tab: timeline ข้ามเล่ม / age tracker
    crossTimeline: [],  // [{ id, year, title, desc, bookId }]
    charAgeMap: [],     // [{ id, charName, birthYear, notes }]
    // Arcs tab: story arc ข้ามเล่ม
    arcs: [],           // [{ id, title, desc, bookIds[], status }]
    // Plots tab: plot thread
    plots: [],          // [{ id, title, desc, status, linkedChapterIds[], bookId }]
  };
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function NovelFlowArtist() {
  const [screen, setScreen]         = useState("loading");  // loading | home | editor
  const [projects, setProjects]     = useState([]);
  const [activeProjectId, setActiveProjectId] = useState(null);

  // ─ Series state (V25) ────────────────────────────────────────────────────────
  const [series, setSeries]               = useState([]);   // all series list
  const [showSeriesModal, setShowSeriesModal] = useState(false);
  const [editingSeries, setEditingSeries]     = useState(null); // null=new, obj=edit
  const [seriesSubTab, setSeriesSubTab]       = useState("bible"); // bible|consistency|arcs|plots

  // Current project state (loaded into memory)
  const [book, setBook]             = useState(defaultBook());
  const [settings, setSettings]     = useState(defaultSettings());
  const [chapters, setChapters]     = useState(defaultChapters());
  const [characters, setCharacters] = useState(defaultCharacters());
  const [timeline, setTimeline]     = useState(defaultTimeline());
  const [world, setWorld]           = useState(defaultWorldBible());
  const [specialPages, setSpecialPages] = useState(defaultSpecialPages());
  const [bookStructure, setBookStructure] = useState(defaultBookStructure());
  const [writingGoal, setWritingGoal] = useState(500);

  // ─ V27: Session words, streak, project target ────────────────────────────
  const [sessionWords, setSessionWords]     = useState(0);        // คำที่พิมพ์ในเซสชันนี้
  const sessionStartWords                   = useRef(null);       // baseline at session start
  const [streakData, setStreakData]         = useState(() => loadStreakData());
  const [goalReached, setGoalReached]       = useState(false);    // ป้องกัน toast ซ้ำ
  const [projectTarget, setProjectTarget]  = useState(80000);    // เป้าหมายคำทั้งเรื่อง
  const [showDashboard, setShowDashboard]  = useState(false);    // Dashboard overlay

  // ─ Snapshot / Version History ─────────────────────────────────────────────
  const [snapshots, setSnapshots]           = useState([]);
  const [showSnapshotPanel, setShowSnapshotPanel] = useState(false);
  const [snapshotLabel, setSnapshotLabel]   = useState("");
  const MAX_SNAPSHOTS = 20;

  async function saveSnapshot(label = "") {
    if (!activeProjectId) return;
    const snap = {
      id: newId(),
      projectId: activeProjectId,
      label: label || `Snapshot ${new Date().toLocaleString("th-TH")}`,
      savedAt: new Date().toISOString(),
      data: {
        book:          JSON.parse(JSON.stringify(book)),
        settings:      JSON.parse(JSON.stringify(settings)),
        chapters:      JSON.parse(JSON.stringify(chapters)),
        characters:    JSON.parse(JSON.stringify(characters)),
        timeline:      JSON.parse(JSON.stringify(timeline)),
        world:         JSON.parse(JSON.stringify(world)),
        specialPages:  JSON.parse(JSON.stringify(specialPages)),
        bookStructure: JSON.parse(JSON.stringify(bookStructure)),
        scenes:        JSON.parse(JSON.stringify(scenes)),
        relationships: JSON.parse(JSON.stringify(relationships)),
      },
    };
    try {
      await dbPut("snapshots", snap);
      // Keep only MAX_SNAPSHOTS per project — prune oldest
      const all = await dbGetByIndex("snapshots", "projectId", activeProjectId);
      all.sort((a,b) => new Date(b.savedAt) - new Date(a.savedAt));
      if (all.length > MAX_SNAPSHOTS) {
        for (const old of all.slice(MAX_SNAPSHOTS)) {
          await dbDelete("snapshots", old.id);
        }
      }
      setSnapshots(all.slice(0, MAX_SNAPSHOTS));
      showToast(`📸 บันทึก Snapshot: ${snap.label}`);
    } catch(e) {
      console.error("Save snapshot error:", e);
      showToast("❌ บันทึก Snapshot ล้มเหลว");
    }
  }

  async function loadSnapshots() {
    if (!activeProjectId) return;
    try {
      const all = await dbGetByIndex("snapshots", "projectId", activeProjectId);
      all.sort((a,b) => new Date(b.savedAt) - new Date(a.savedAt));
      setSnapshots(all);
    } catch(e) {
      console.error("Load snapshots error:", e);
    }
  }

  async function restoreSnapshot(snap) {
    if (!snap?.data) return;
    await saveSnapshot("Auto-backup before restore");
    if (snap.data.book)       setBook(snap.data.book);
    if (snap.data.settings)   setSettings(snap.data.settings);
    if (snap.data.chapters)   setChapters(snap.data.chapters);
    if (snap.data.characters) setCharacters(snap.data.characters);
    if (snap.data.timeline)   setTimeline(snap.data.timeline);
    if (snap.data.world)         setWorld(snap.data.world);
    if (snap.data.specialPages)   setSpecialPages(snap.data.specialPages);
    if (snap.data.bookStructure)  setBookStructure(snap.data.bookStructure);
    if (snap.data.scenes)         setScenes(snap.data.scenes);
    if (snap.data.relationships)  setRelationships(snap.data.relationships);
    setShowSnapshotPanel(false);
    showToast("⏮ Restore สำเร็จ: " + snap.label);
  }

  async function deleteSnapshot(snapId) {
    try {
      await dbDelete("snapshots", snapId);
      setSnapshots(prev => prev.filter(s => s.id !== snapId));
      showToast("🗑 ลบ Snapshot แล้ว");
    } catch(e) {
      console.error("Delete snapshot error:", e);
    }
  }

  // ─ Image System ──────────────────────────────────────────────────────────────
  const [images, setImages]                   = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const selectedImage = images.find(img => img.id === selectedImageId) || null;


  // ─ Text-to-Speech helpers ────────────────────────────────────────────────────
  // ── keepAlive timer: แก้ Chrome bug เสียงหยุดกลางคัน ───────────────────────
  const ttsKeepAliveRef = useRef(null);
  function _ttsStartKeepAlive() {
    _ttsStopKeepAlive();
    ttsKeepAliveRef.current = setInterval(() => {
      if (window.speechSynthesis?.speaking && !window.speechSynthesis?.paused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000); // ทุก 10 วิ — ป้องกัน Chrome ตัดเสียง
  }
  function _ttsStopKeepAlive() {
    clearInterval(ttsKeepAliveRef.current);
    ttsKeepAliveRef.current = null;
  }

  // ── sentence splitter: แบ่งข้อความเป็นประโยค ────────────────────────────────
  function _splitSentences(text) {
    // แบ่งตาม . ! ? ไทย: ใช้ช่องว่างเป็นตัวแบ่งด้วย
    return text.match(/[^.!?\n]+[.!?\n]*/g)?.map(s => s.trim()).filter(Boolean) || [text];
  }

  // ── refs สำหรับ sentence-by-sentence TTS ───────────────────────────────────
  const ttsSentencesRef = useRef([]);  // ประโยคทั้งหมดของบทปัจจุบัน
  const ttsSentIdxRef   = useRef(0);   // index ประโยคที่อ่านอยู่

  function ttsStop() {
    _ttsStopKeepAlive();
    window.speechSynthesis?.cancel();
    setTtsPlaying(false);
    setTtsPaused(false);
    setTtsChId(null);
    setTtsHighlight("");
    ttsSentencesRef.current = [];
    ttsSentIdxRef.current   = 0;
    ttsUtterRef.current = null;
  }

  // ── อ่านประโยคทีละประโยค (แก้ Chrome bug + รองรับ highlight) ─────────────
  function _ttsSpeakSentence(sentences, idx, chId) {
    if (idx >= sentences.length) {
      // จบบทนี้ → ไปบทถัดไปอัตโนมัติ (auto-advance)
      const chaps = chaptersRef.current;
      const curIdx = chaps.findIndex(c => c.id === chId);
      if (curIdx >= 0 && curIdx < chaps.length - 1) {
        const nextCh = chaps[curIdx + 1];
        showToastRef.current?.(`🔊 บท: ${nextCh.title || `บทที่ ${curIdx + 2}`}`);
        // เปลี่ยนบทใน editor ด้วย
        setActiveChId(nextCh.id);
        setTimeout(() => ttsSpeak(nextCh.id), 400);
      } else {
        // จบทั้งหมด
        _ttsStopKeepAlive();
        setTtsPlaying(false);
        setTtsPaused(false);
        setTtsChId(null);
        setTtsHighlight("");
      }
      return;
    }

    const sentence = sentences[idx];
    setTtsHighlight(sentence);
    ttsSentIdxRef.current = idx;

    const allVoices = window.speechSynthesis?.getVoices() || [];
    const picked = allVoices.find(v => v.name === ttsVoiceName);

    const utter = new SpeechSynthesisUtterance(sentence);
    if (picked) {
      utter.voice = picked;
      utter.lang  = picked.lang;
    } else {
      const thaiChars = (sentence.match(/[฀-๿]/g) || []).length;
      utter.lang = thaiChars / Math.max(1, sentence.length) > 0.2 ? "th-TH" : "en-US";
    }
    utter.rate  = ttsRate;
    utter.pitch = 1;

    utter.onend = () => {
      if (window.speechSynthesis?.paused) return; // ถูก pause → รอ resume
      _ttsSpeakSentence(sentences, idx + 1, chId);
    };
    utter.onerror = (e) => {
      if (e.error === "interrupted" || e.error === "canceled") return;
      _ttsSpeakSentence(sentences, idx + 1, chId); // ข้ามประโยคที่มีปัญหา
    };

    ttsUtterRef.current = utter;
    window.speechSynthesis?.speak(utter);
  }

  function ttsSpeak(chId) {
    const ch = chapters.find(c => c.id === chId);
    if (!ch) return;
    const text = stripHtml(ch.content || "").replace(/\[IMAGE:[^\]]*\]/g, "").trim();
    if (!text) { showToastRef.current?.("⚠️ บทนี้ยังไม่มีเนื้อหา"); return; }

    window.speechSynthesis?.cancel();
    _ttsStopKeepAlive();

    const sentences = _splitSentences(text);
    ttsSentencesRef.current = sentences;
    ttsSentIdxRef.current   = 0;

    setTtsPlaying(true);
    setTtsPaused(false);
    setTtsChId(chId);

    _ttsStartKeepAlive();
    _ttsSpeakSentence(sentences, 0, chId);
  }

  function ttsPause() {
    if (ttsPlaying && !ttsPaused) {
      window.speechSynthesis?.pause();
      _ttsStopKeepAlive();
      setTtsPaused(true);
    } else if (ttsPaused) {
      window.speechSynthesis?.resume();
      _ttsStartKeepAlive();
      setTtsPaused(false);
    }
  }

  // Load available TTS voices
  useEffect(() => {
    function loadVoices() {
      const v = window.speechSynthesis?.getVoices() || [];
      if (v.length > 0) setTtsVoices(v);
    }
    loadVoices();
    window.speechSynthesis?.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", loadVoices);
  }, []);


  // ─ Global keyboard shortcuts (uses refs to avoid hooks-order violation) ─
  const kbStateRef = useRef({});
  useEffect(() => {
    kbStateRef.current = { selectedImageId, frBarVisible, readingMode, screen, mainTab, focusMode };
  });
  const kbFnRef = useRef({});
  useEffect(() => {
    kbFnRef.current = { setSelectedImageId, setFrBarVisible, setFrCount, setReadingMode, setFrReplace, frQueryRef };
  });
  useEffect(() => {
    function onKeyDown(e) {
      const ctrl = e.ctrlKey || e.metaKey;
      const { selectedImageId, frBarVisible, readingMode, screen, mainTab, focusMode } = kbStateRef.current;
      const { setSelectedImageId, setFrBarVisible, setFrCount, setReadingMode, setFrReplace, frQueryRef } = kbFnRef.current;

      // ─ Input/textarea bypass ─────────────────────────────────────────────
      // ถ้า focus อยู่ใน input / textarea / contentEditable
      // ให้ผ่านได้เฉพาะ ESC กับ Ctrl+S เท่านั้น
      // shortcut อื่น (Ctrl+F, Ctrl+H, Ctrl+`, Ctrl+Enter) ยกเลิก
      const tag = e.target.tagName;
      const inField = tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable;
      if (inField && !(e.key === "Escape" || (ctrl && e.key === "s"))) return;
      // ─────────────────────────────────────────────────────────────────────

      // ESC: deselect image → close find bar → exit reading mode
      if (e.key === "Escape") {
        if (selectedImageId)      { setSelectedImageId(null); return; }
        if (frBarVisible)         { setFrBarVisible(false); setFrCount(null); return; }
        if (readingMode)          { setReadingMode(false); return; }
        return;
      }

      // Ctrl+S — manual save
      if (ctrl && e.key === "s") {
        e.preventDefault();
        if (screen === "editor") {
          doAutoSaveRef.current?.();
          showToastRef.current?.("💾 บันทึกแล้ว");
        }
        return;
      }

      // Ctrl+F — open Find bar (no Replace)
      if (ctrl && e.key === "f" && screen === "editor" && mainTab === "editor") {
        e.preventDefault();
        setFrBarVisible(true);
        setFrReplace("");
        setTimeout(() => frQueryRef.current?.focus(), 50);
        return;
      }

      // Ctrl+H — open Find & Replace bar (with replace row)
      if (ctrl && e.key === "h" && screen === "editor" && mainTab === "editor") {
        e.preventDefault();
        setFrBarVisible(true);
        setTimeout(() => frQueryRef.current?.focus(), 50);
        return;
      }

      // Ctrl+` — toggle Reading Mode
      if (ctrl && e.key === "`" && screen === "editor" && mainTab === "editor") {
        e.preventDefault();
        setReadingMode(v => !v);
        return;
      }

      // Ctrl+Enter — Enter / Exit Focus Mode
      if (ctrl && e.key === "Enter" && screen === "editor" && mainTab === "editor") {
        e.preventDefault();
        if (focusMode) exitFocusModeRef.current?.();
        else enterFocusModeRef.current?.();
        return;
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []); // stable — reads state via refs


  // ─ Image Insert Dialog state ──────────────────────────────────────────────────
  const [showImgInsertDialog, setShowImgInsertDialog] = useState(false);

  function handleInsertImage() {
    if (!activeChId) { showToast("⚠️ เปิดบทก่อนแทรกภาพ"); return; }
    setShowImgInsertDialog(true);
  }

  function _doInsertImageWithSrc(src, alt) {
    const img = createImage(activeChId);
    const finalize = async () => {
      if (src) {
        const size = await getImageNaturalSize(src);
        const dims = fitImageDimensions(size.width, size.height, 300, 400);
        const finalImg = { ...img, src, alt: alt || img.alt, ...dims };
        setImages(prev => [...prev, finalImg]);
        setSelectedImageId(finalImg.id);
      } else {
        setImages(prev => [...prev, img]);
        setSelectedImageId(img.id);
      }
      setSidebarTab("image");
      setRightOpen(true);
      setShowImgInsertDialog(false);
    };
    finalize();
  }

  function handleInsertImageBlank() {
    if (!activeChId) return;
    const img = createImage(activeChId);
    setImages(prev => [...prev, img]);
    setSelectedImageId(img.id);
    setSidebarTab("image");
    setRightOpen(true);
    setShowImgInsertDialog(false);
  }
  function handleUpdateImage(id, patch) {
    setImages(prev => prev.map(img => img.id === id ? updateImage(img, patch) : img));
  }
  async function handleUploadImage(id, dataUrl, fileName) {
    const size = await getImageNaturalSize(dataUrl);
    const dims = fitImageDimensions(size.width, size.height, 300, 400);
    handleUpdateImage(id, { src: dataUrl, alt: fileName, ...dims });
  }
  function handleDeleteImage(id) {
    setImages(prev => deleteImage(prev, id));
    if (selectedImageId === id) { setSelectedImageId(null); }
    const ch = chapters.find(c => c.id === activeChId);
    if (ch) updateChapter(activeChId, { content: removeImageMarker(ch.content, id) });
  }

  // ─ UI state (must be declared before keyboard shortcut useEffect) ─
  const [mainTab, setMainTab]       = useState("editor");
  const [workMode, setWorkMode]     = useState("write"); // "write" | "book"
  const [focusMode, setFocusMode]   = useState(false);
  const [readingMode, setReadingMode]   = useState(false); // Ctrl+` reading/preview mode
  const [showFR, setShowFR]         = useState(false);
  const [frQuery, setFrQuery]       = useState("");
  const [frReplace, setFrReplace]   = useState("");
  const [frCount, setFrCount]       = useState(null);
  const [frBarVisible, setFrBarVisible] = useState(false); // inline bar under toolbar
  const frQueryRef      = useRef(null);
  const editorScrollRef = useRef(null);
  const insertTriggerRef  = useRef(null); // เปิด insert-page picker จากเมนู

  const [assets, setAssets]         = useState([]);

  // ─ Scene Board ───────────────────────────────────────────────────────────────
  const [scenes, setScenes] = useState([]);

  // ─ Mind Map ──────────────────────────────────────────────────────────────────
  const [mindMap, setMindMap] = useState({ nodes: [], edges: [] });

  function addScene(status = "draft") {
    const s = { id:newId(), title:"Scene ใหม่", desc:"", status, chapterId:"", color:"#8b4513", createdAt:new Date().toISOString() };
    setScenes(prev => [...prev, s]);
    showToast("➕ เพิ่ม Scene ใหม่");
  }
  function updateScene(id, patch) {
    setScenes(prev => prev.map(s => s.id === id ? {...s,...patch} : s));
  }
  function deleteScene(id) {
    setScenes(prev => prev.filter(s => s.id !== id));
    showToast("🗑 ลบ Scene แล้ว");
  }

  // ─ Character Relationships ────────────────────────────────────────────────
  const [relationships, setRelationships] = useState([]);

  function addRelationship(fromId, toId, type = "เพื่อน", desc = "") {
    const r = { id:newId(), fromId, toId, type, desc };
    setRelationships(prev => [...prev, r]);
  }
  function deleteRelationship(id) {
    setRelationships(prev => prev.filter(r => r.id !== id));
  }
  function updateRelationship(id, patch) {
    setRelationships(prev => prev.map(r => r.id === id ? {...r,...patch} : r));
  }

  // UI state (mainTab, focusMode, readingMode declared above before keyboard useEffect)
  const [activeChId, setActiveChId] = useState(null);
  const chaptersRef    = useRef(chapters);
  const activeChIdRef  = useRef(activeChId);
  useEffect(() => { chaptersRef.current = chapters; },    [chapters]);
  useEffect(() => { activeChIdRef.current = activeChId; }, [activeChId]);
  useEffect(() => { if (editorScrollRef.current) editorScrollRef.current.scrollTop = 0; }, [activeChId]);

  // ── V31: Swipe gesture เพื่อเปลี่ยนบท (touch) ─────────────────────────────
  useEffect(() => {
    const el = editorScrollRef.current;
    if (!el) return;
    let touchStartX = 0;
    let touchStartY = 0;
    function onTouchStart(e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
    function onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      // ต้องเป็น horizontal swipe (dx ≥ 60px, dx > 2×dy)
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 2) return;
      // อ่าน chapters และ activeChId ผ่าน ref (ไม่ stale)
      const chaps = chaptersRef.current;
      const curId  = activeChIdRef.current;
      if (!chaps || !curId) return;
      const idx = chaps.findIndex(c => c.id === curId);
      if (idx < 0) return;
      if (dx < 0 && idx < chaps.length - 1) {
        // swipe left → บทถัดไป
        setActiveChId(chaps[idx + 1].id);
      } else if (dx > 0 && idx > 0) {
        // swipe right → บทก่อนหน้า
        setActiveChId(chaps[idx - 1].id);
      }
    }
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend",   onTouchEnd,   { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend",   onTouchEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount once — อ่าน state ผ่าน refs
  const [sidebarTab, setSidebarTab] = useState("chapters");
  // ─ Text-to-Speech state ──────────────────────────────────────────────────────
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const [ttsPaused, setTtsPaused]   = useState(false);
  const [ttsChId, setTtsChId]       = useState(null);   // which chapter is playing
  const ttsUtterRef = useRef(null);
  const [ttsVoices, setTtsVoices]   = useState([]);     // available voices
  const [ttsVoiceName, setTtsVoiceName] = useState(""); // selected voice name
  const [ttsRate, setTtsRate]       = useState(0.95);   // speed
  const [ttsShowPanel, setTtsShowPanel] = useState(false); // voice picker panel
  const [ttsHighlight, setTtsHighlight] = useState(""); // ประโยคที่กำลังอ่านอยู่
  const [rightOpen, setRightOpen]   = useState(true);
  const [leftOpen, setLeftOpen]     = useState(true);
  const [chListOpen, setChListOpen] = useState(true);
  const [micInterim, setMicInterim] = useState("");   // 🎙 interim speech text (realtime)
  const [toast, setToast]           = useState(null);
  const [autosaveStatus, setAutosaveStatus] = useState("idle");
  const isDirty = useRef(false);          // true = มีการเปลี่ยนแปลงที่ยังไม่ได้ save
  const lastSavedHash = useRef("");       // hash ของ project ที่ save ไปล่าสุด
  const [goalInput, setGoalInput]   = useState("500");
  const [editingChId, setEditingChId] = useState(null);
  const [editingChTitle, setEditingChTitle] = useState("");
  const [dragOver, setDragOver]     = useState(null);
  const [dragItem, setDragItem]     = useState(null);
  // Home screen: drag project card → drop on series card
  const [homeDragProject, setHomeDragProject] = useState(null); // project.id being dragged
  const [homeDragOverSeries, setHomeDragOverSeries] = useState(null); // series.id being hovered
  const [viewMode, setViewMode]     = useState("write"); // write | book | kindle | print | mobile
  const [showViewBar, setShowViewBar] = useState(true);   // ซ่อน/แสดง view mode bar
  const [splitChId, setSplitChId]   = useState(null);    // null = single pane, chId = split view
  const [showQuickStyle, setShowQuickStyle] = useState(false); // 🎨 floating quick style panel
  // ── V31: Typewriter Mode + Paragraph Focus ───────────────────────────────────
  const [typewriterMode, setTypewriterMode]   = useState(false); // scroll บรรทัดพิมพ์กลางจอ
  const [paraFocusMode, setParaFocusMode]     = useState(false); // dim paragraphs ที่ไม่ได้ focus
  // ── AI state via useReducer ──────────────────────────────────────────────────
  const aiInitialState = {
    loading: false,
    result: "",
    tab: "character",
    input: "",
    provider: "claude",
    keys: { claude: "", gemini: "", gpt: "" },
    showSettings: false,
    proxyMode: false,   // true = route via backend proxy (no key in browser)
  };
  function aiReducer(state, action) {
    switch (action.type) {
      case "SET_LOADING":     return { ...state, loading: action.value };
      case "SET_RESULT":      return { ...state, result: action.value };
      case "SET_TAB":         return { ...state, tab: action.value, result: "" };
      case "SET_INPUT":       return { ...state, input: action.value };
      case "SET_PROVIDER":    return { ...state, provider: action.value };
      case "SET_KEYS":        return { ...state, keys: action.value };
      case "SHOW_SETTINGS":   return { ...state, showSettings: action.value };
      case "RUN_START":       return { ...state, loading: true, result: "" };
      case "RUN_DONE":        return { ...state, loading: false, result: action.value };
      case "RUN_ERROR":       return { ...state, loading: false, result: "❌ Error: " + action.error };
      case "SET_PROXY_MODE": return { ...state, proxyMode: action.value };
      default:                return state;
    }
  }
  const [aiState, dispatchAi] = useReducer(aiReducer, aiInitialState);

  // Convenience aliases for backward-compat with existing JSX
  const aiLoading     = aiState.loading;
  const aiResult      = aiState.result;
  const aiTab         = aiState.tab;
  const aiInput       = aiState.input;
  const aiProvider    = aiState.provider;
  const aiKeys        = aiState.keys;
  const showAiSettings = aiState.showSettings;
  const aiProxyMode   = aiState.proxyMode;
  const setAiProxyMode = (v) => dispatchAi({ type: "SET_PROXY_MODE", value: v });
  const setAiLoading     = (v) => dispatchAi({ type: "SET_LOADING",   value: v });
  const setAiResult      = (v) => dispatchAi({ type: "SET_RESULT",    value: v });
  const setAiTab         = (v) => dispatchAi({ type: "SET_TAB",       value: v });
  const setAiInput       = (v) => dispatchAi({ type: "SET_INPUT",     value: v });
  const setShowAiSettings = (v) => dispatchAi({ type: "SHOW_SETTINGS", value: v });
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName]     = useState("");
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showDuplicateProject, setShowDuplicateProject] = useState(null);

  const autosaveTimer   = useRef(null);
  const loadInput       = useRef(null);
  const coverInput      = useRef(null);
  const backCoverInput  = useRef(null);
  const assetInput      = useRef(null);
  const docxInput       = useRef(null);
  const mdInput         = useRef(null);
  const epubInput       = useRef(null);

  const theme      = useMemo(() => {
    const base = THEMES[settings.theme] || THEMES.white;
    const cp   = settings.colorPalette || {};
    return {
      ...base,
      ...(cp.bodyText    ? { ink:         cp.bodyText    } : {}),
      ...(cp.accentColor ? { accent:      cp.accentColor, accentLight: cp.accentColor + "22" } : {}),
      ...(cp.bgPage      ? { bg:          cp.bgPage      } : {}),
    };
  }, [settings.theme, settings.colorPalette]);
  const activeCh   = useMemo(() => chapters.find(c => c.id === activeChId) || chapters[0] || null, [chapters, activeChId]);
  const layoutSize = useMemo(() => {
    const base = LAYOUT_SIZES[settings.layout] || LAYOUT_SIZES.a5;
    if ((settings.orientation || "portrait") === "landscape") {
      return { ...base, w: base.h, h: base.w, px: { w: base.px.h, h: base.px.w } };
    }
    return base;
  }, [settings.layout, settings.orientation]);
  const totalWords = useMemo(() => chapters.reduce((s,c) => s + wordCount(c.content), 0),          [chapters]);
  const totalChars = useMemo(() => chapters.reduce((s,c) => s + stripHtml(c.content||"").length, 0),        [chapters]);
  const pageWords  = useMemo(() => Math.round((layoutSize.px.h / 28) * 13),                        [layoutSize]);
  const estPages   = useMemo(() => Math.max(1, Math.ceil(totalWords / pageWords)),                  [totalWords, pageWords]);
  const readMins   = useMemo(() => Math.max(1, Math.round(totalWords / 200)),                       [totalWords]);

  // รูปภาพของบทที่ active — แยก behind/inline ไว้ล่วงหน้า
  // ป้องกัน getImagesForChapter + filter วิ่งซ้ำทุก render ขณะพิมพ์
  const activeChImages = useMemo(() => getImagesForChapter(images, activeChId), [images, activeChId]);
  const behindImages   = useMemo(() => activeChImages.filter(img => img.wrapMode === "behind_text" || img.wrapMode === "in_front"), [activeChImages]);
  const inlineImages   = useMemo(() => activeChImages.filter(img => ["inline","square","tight"].includes(img.wrapMode)), [activeChImages]);

  // ─ V27: Session word counter — นับคำที่พิมพ์ตั้งแต่เปิดโปรเจกต์ ─────────────
  useEffect(() => {
    if (screen !== "editor") return;
    if (sessionStartWords.current === null) {
      // baseline = คำทั้งหมด ณ ตอนที่เปิดโปรเจกต์
      sessionStartWords.current = totalWords;
    }
    const sw = Math.max(0, totalWords - sessionStartWords.current);
    setSessionWords(sw);

    // ตรวจ goal reached
    if (!goalReached && sw >= writingGoal && writingGoal > 0) {
      setGoalReached(true);
      const updated = markStreakToday();
      setStreakData(updated);
      showToastRef.current?.(`🎉 ถึงเป้าแล้ว! ${sw.toLocaleString()} คำ · 🔥 Streak ${updated.streak} วัน`, 4000);
    }
  }, [totalWords, screen, writingGoal, goalReached]);

  // reset session baseline เมื่อเปลี่ยนโปรเจกต์
  useEffect(() => {
    sessionStartWords.current = null;
    setSessionWords(0);
    setGoalReached(false);
  }, [activeProjectId]);


  const showToast = useCallback((msg, dur=2500) => {
    setToast(msg);
    setTimeout(() => setToast(null), dur);
  }, []);
  const showToastRef = useRef(showToast);
  useEffect(() => { showToastRef.current = showToast; }, [showToast]);

  // ─ Load all projects on mount ─
  const [crashDraft, setCrashDraft] = useState(null);  // draft ที่รอด recover

  useEffect(() => {
    async function init() {
      try {
        let all = await dbGetAll("projects");
        // Migrate from legacy DB if empty
        if (all.length === 0) {
          await migrateFromLegacyDB();
          all = await dbGetAll("projects");
        }
        all.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setProjects(all);
        if (all.length > 0) loadProjectData(all[0]);
        // V25: load all series
        try {
          const allSeries = await dbGetAll("series");
          allSeries.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          setSeries(allSeries);
        } catch(se) { console.error("Load series error:", se); }
      } catch(e) {
        console.error("DB init error", e);
      }
      try {
        const savedKeys = sessionStorage.getItem("nfa_ai_keys");
        if (savedKeys) dispatchAi({ type: "SET_KEYS", value: JSON.parse(savedKeys) });
        const savedProvider = sessionStorage.getItem("nfa_ai_provider");
        if (savedProvider) dispatchAi({ type: "SET_PROVIDER", value: savedProvider });
      } catch(e) { console.error("Failed to restore AI session:", e); }

      // ตรวจ crash draft จาก session ก่อน
      const draft = loadCrashDraft();
      if (draft && draft.chapters?.length > 0) {
        setCrashDraft(draft);
      }

      setScreen("home");
    }
    init();
  }, []);

  // ─ Autosave to IndexedDB ─
  useEffect(() => {
    if (screen !== "editor" || !activeProjectId) return;
    isDirty.current = true;  // มีการเปลี่ยนแปลง
    // บันทึก crash draft ทันทีที่มีการแก้ไข (ก่อน debounce)
    saveCrashDraft(activeProjectId, chapters);
    clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(doAutoSave, 2000);
    return () => clearTimeout(autosaveTimer.current);
  }, [book, chapters, settings, characters, timeline, world, specialPages, bookStructure, writingGoal, screen]);

  async function doAutoSave() {
    if (!activeProjectId) return;
    if (!isDirty.current) return;  // ไม่มีการเปลี่ยนแปลง — ข้ามได้เลย

    // สร้าง lightweight hash เพื่อเปรียบเทียบ (ไม่ serialize ทั้งหมด)
    const quickHash = `${book.title}|${chapters.length}|${chapters.reduce((s,c)=>s+(c.content||"").length,0)}|${characters.length}|${settings.font}|${settings.fontSize}|${scenes.length}|${relationships.length}|${specialPages ? JSON.stringify(specialPages).length : 0}`;
    if (quickHash === lastSavedHash.current) {
      isDirty.current = false;
      return;  // ข้อมูลไม่เปลี่ยนจริงๆ — ข้ามได้
    }

    setAutosaveStatus("saving");
    try {
      const project = buildProjectData();
      await dbPut("projects", project);
      lastSavedHash.current = quickHash;
      isDirty.current = false;
      clearCrashDraft();  // save สำเร็จ — ไม่ต้องเก็บ crash draft แล้ว
      setProjects(prev => {
        const exists = prev.find(p => p.id === activeProjectId);
        if (exists) return prev.map(p => p.id === activeProjectId ? {...p, name:book.title||p.name, updatedAt:project.updatedAt} : p);
        return [project, ...prev];
      });
      setAutosaveStatus("saved");
      setTimeout(() => setAutosaveStatus("idle"), 3000);
    } catch(e) {
      console.error("Autosave failed:", e);
      setAutosaveStatus("error");
    }
  }

  function buildProjectData() {
    return {
      id: activeProjectId,
      name: book.title || "Untitled",
      book, settings, chapters, characters, timeline, world,
      specialPages, bookStructure, writingGoal, projectTarget,
      scenes, relationships, mindMap,
      images: serializeImages(images),
      seriesId: projects.find(p => p.id === activeProjectId)?.seriesId || null,
      updatedAt: new Date().toISOString(),
      version: "8",
    };
  }

  function loadProjectData(p) {
    setActiveProjectId(p.id);
    if (p.book)          setBook(p.book);
    if (p.chapters)      setChapters(p.chapters);
    if (p.settings)      setSettings(p.settings);
    if (p.characters)    setCharacters(p.characters);
    if (p.timeline)      setTimeline(p.timeline);
    if (p.world)         setWorld(p.world);
    if (p.specialPages)  setSpecialPages(p.specialPages);
    if (p.bookStructure) setBookStructure(p.bookStructure);
    if (p.writingGoal)   { setWritingGoal(p.writingGoal); setGoalInput(String(p.writingGoal)); }
    if (p.projectTarget) setProjectTarget(p.projectTarget);
    if (p.images)        setImages(deserializeImages(p.images));
    if (p.scenes)        setScenes(p.scenes);
    if (p.relationships) setRelationships(p.relationships);
    if (p.mindMap)       setMindMap(p.mindMap);
    setActiveChId(p.chapters?.[0]?.id || null);
  }

  const doAutoSaveRef = useRef(null);
  useEffect(() => { doAutoSaveRef.current = doAutoSave; });
  async function openProject(p) {
    loadProjectData(p);
    // Load assets for this project
    try {
      const projAssets = await dbGetByIndex("assets", "projectId", p.id);
      setAssets(projAssets || []);
    } catch(e) { console.error("Failed to load project assets:", e); setAssets([]); }
    // Load snapshots
    try {
      const snaps = await dbGetByIndex("snapshots", "projectId", p.id);
      snaps.sort((a,b) => new Date(b.savedAt) - new Date(a.savedAt));
      setSnapshots(snaps);
    } catch(e) { console.error("Failed to load snapshots:", e); }
    setScreen("editor");
    setMainTab("editor");
  }

  async function createFromTemplate(tpl, name, layout, seriesId = null) {
    const title = name.trim() || tpl.label + " — ใหม่";
    const chaps = (tpl.chapters || []).map(c => ({
      id: newId(), title: c.title, content: c.content || "", note: ""
    }));

    // Build world from preset — or use defaults if none defined
    const wp = tpl.worldPreset;
    const worldData = wp ? {
      locations:     (wp.locations     || []).map(x => ({ id:newId(), ...x })),
      organizations: (wp.organizations || []).map(x => ({ id:newId(), ...x })),
      lore:          (wp.lore          || []).map(x => ({ id:newId(), ...x })),
    } : defaultWorldBible();

    // Build characters from preset — or use defaults if none defined
    const charsData = tpl.characters && tpl.characters.length > 0
      ? tpl.characters.map(c => ({ id:newId(), ...c }))
      : defaultCharacters();

    const p = newProject({
      name: title,
      book: { ...defaultBook(), title, genre: tpl.book?.genre || "", targetAudience: tpl.book?.targetAudience || "", language: tpl.book?.language || "ไทย" },
      settings: { ...defaultSettings(), ...tpl.settings, ...(layout ? { layout } : {}) },
      chapters: chaps.length > 0 ? chaps : defaultChapters(),
      characters: charsData,
      world: worldData,
      writingGoal: tpl.writingGoal || 500,
    });
    try {
      await dbPut("projects", p);
      setProjects(prev => [p, ...prev]);
      // Link to series if selected
      if (seriesId) {
        await addProjectToSeries(p.id, seriesId);
      }
      loadProjectData(p);
      setActiveProjectId(p.id);
      setScreen("editor");
      setMainTab("editor");
      setShowTemplatePicker(false);
      setShowNewProject(false);
      setNewProjectName("");
      showToast("✨ สร้างโปรเจกต์จาก Preset: " + tpl.label + (seriesId ? " · เพิ่มเข้า Series แล้ว" : ""));
    } catch(e) {
      console.error("createFromTemplate error:", e);
      showToast("❌ สร้างโปรเจกต์ล้มเหลว");
    }
  }

  async function createNewProject() {
    const name = newProjectName.trim() || "โปรเจกต์ใหม่";
    const p = newProject({ name, book: { ...defaultBook(), title: name } });
    await dbPut("projects", p);
    setProjects(prev => [p, ...prev]);
    setNewProjectName("");
    setShowNewProject(false);
    await openProject(p);
    showToast("✨ สร้างโปรเจกต์ใหม่แล้ว");
  }

  async function duplicateProject(p) {
    const dup = {
      ...p,
      id: newId(),
      name: p.name + " (สำเนา)",
      book: { ...p.book, title: (p.book?.title||p.name) + " (สำเนา)" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await dbPut("projects", dup);
    setProjects(prev => [dup, ...prev]);
    setShowDuplicateProject(null);
    showToast("📄 Duplicate โปรเจกต์แล้ว");
  }

  async function deleteProject(id) {
    await dbDelete("projects", id);
    // Delete assets
    try {
      const projAssets = await dbGetByIndex("assets", "projectId", id);
      for (const a of projAssets) await dbDelete("assets", a.id);
    } catch(e) { /* ignore asset cleanup errors */ }
    // Delete snapshots for this project
    try {
      const projSnaps = await dbGetByIndex("snapshots", "projectId", id);
      for (const s of projSnaps) await dbDelete("snapshots", s.id);
    } catch(e) { /* ignore snapshot cleanup errors */ }
    setProjects(prev => prev.filter(p => p.id !== id));
    if (activeProjectId === id) {
      setActiveProjectId(null);
      setScreen("home");
    }
    setShowDeleteConfirm(null);
    showToast("🗑 ลบโปรเจกต์แล้ว");
  }

  // ─ Series CRUD (V26) ─────────────────────────────────────────────────────────
  // FIX: อ่านข้อมูลจาก IndexedDB โดยตรงแทนการอ่านจาก state (stale closure)
  async function createSeries(title, desc, coverColor) {
    const s = newSeries({ title: title.trim() || "ชุดนิยายใหม่", desc, coverColor });
    await dbPut("series", s);
    setSeries(prev => [s, ...prev]);
    showToast("📚 สร้างชุดนิยาย: " + s.title);
    return s;
  }

  async function updateSeries(id, patch) {
    // FIX: อ่านจาก DB แทน state เพื่อหลีกเลี่ยง stale closure
    const existing = await dbGet("series", id);
    if (!existing) return;
    const updated = { ...existing, ...patch, updatedAt: new Date().toISOString() };
    await dbPut("series", updated);
    setSeries(prev => prev.map(s => s.id === id ? updated : s));
  }

  async function deleteSeries(id) {
    await dbDelete("series", id);
    // Unlink all projects in this series
    const linked = projects.filter(p => p.seriesId === id);
    for (const p of linked) {
      const updated = { ...p, seriesId: null };
      await dbPut("projects", updated);
    }
    setProjects(prev => prev.map(p => p.seriesId === id ? {...p, seriesId:null} : p));
    setSeries(prev => prev.filter(s => s.id !== id));
    showToast("🗑 ลบชุดนิยายแล้ว");
  }

  async function addProjectToSeries(projectId, seriesId) {
    // FIX: อ่านทั้ง project และ series จาก DB โดยตรง หลีกเลี่ยง stale state
    const p = await dbGet("projects", projectId);
    if (!p) return;
    // Remove from old series bookIds
    if (p.seriesId && p.seriesId !== seriesId) {
      const oldS = await dbGet("series", p.seriesId);
      if (oldS) await updateSeries(oldS.id, { bookIds: oldS.bookIds.filter(id => id !== projectId) });
    }
    // Update project
    const updatedP = { ...p, seriesId };
    await dbPut("projects", updatedP);
    setProjects(prev => prev.map(x => x.id === projectId ? updatedP : x));
    // FIX: อ่าน series ล่าสุดจาก DB ไม่ใช่จาก closure
    const s = await dbGet("series", seriesId);
    if (s && !s.bookIds.includes(projectId)) {
      await updateSeries(seriesId, { bookIds: [...s.bookIds, projectId] });
    }
    showToast("📚 เพิ่มเล่มเข้าชุดนิยายแล้ว");
  }

  async function removeProjectFromSeries(projectId) {
    // FIX: อ่านจาก DB แทน state
    const p = await dbGet("projects", projectId);
    if (!p || !p.seriesId) return;
    const s = await dbGet("series", p.seriesId);
    if (s) await updateSeries(s.id, { bookIds: s.bookIds.filter(id => id !== projectId) });
    const updatedP = { ...p, seriesId: null };
    await dbPut("projects", updatedP);
    setProjects(prev => prev.map(x => x.id === projectId ? updatedP : x));
    showToast("📤 ถอดเล่มออกจากชุดนิยายแล้ว");
  }

  async function updateSeriesBible(seriesId, patch) {
    // FIX: อ่านจาก DB โดยตรง ปลอดภัยจาก stale closure
    const s = await dbGet("series", seriesId);
    if (!s) return;
    await updateSeries(seriesId, { seriesBible: { ...s.seriesBible, ...patch } });
  }

  // ─ Chapter ops ─
  const addChapter = useCallback(() => {
    const ch = { id:newId(), title:`บทที่ ${chapters.length+1}`, content:"", note:"" };
    setChapters(prev => [...prev, ch]);
    setActiveChId(ch.id);
    showToast("➕ เพิ่มบทใหม่");
  }, [chapters.length, showToast]);

  const deleteChapter = useCallback((id) => {
    if (chapters.length <= 1) { showToast("⚠️ ต้องมีบทอย่างน้อย 1 บท"); return; }
    const idx = chapters.findIndex(c => c.id === id);
    const next = chapters[idx === 0 ? 1 : idx - 1];
    setChapters(prev => prev.filter(c => c.id !== id));
    setActiveChId(next.id);
    showToast("🗑 ลบบทแล้ว");
  }, [chapters, showToast]);

  const moveChapter = useCallback((id, dir) => {
    const idx = chapters.findIndex(c => c.id === id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= chapters.length) return;
    const arr = [...chapters];
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
    setChapters(arr);
  }, [chapters]);

  const updateChapter = useCallback((id, patch) => {
    setChapters(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c));
  }, []);

  const setSetting   = (k, v) => setSettings(s => ({ ...s, [k]:v }));
  const setBookField = (k, v) => setBook(b => ({ ...b, [k]:v }));

  // ─ Paragraph format & typography ─
  const setParagraphFormat = (patch) => setSettings(s => ({ ...s, paragraphFormat: { ...(s.paragraphFormat||PARAGRAPH_FORMAT_DEFAULTS), ...patch } }));
  const setTypoOptions     = (patch) => setSettings(s => ({ ...s, typoOptions: { ...(s.typoOptions||DEFAULT_TYPO_OPTIONS), ...patch } }));

  function handleApplyTypography() {
    const opts = settings.typoOptions || DEFAULT_TYPO_OPTIONS;
    const total = chapters.length;

    // สำหรับโปรเจกต์เล็ก (≤20 บท) ทำทันที
    if (total <= 20) {
      setChapters(prev => prev.map(ch => ({ ...ch, content: applyTypography(ch.content, opts) })));
      showToast("✦ แปลง Typography ทุกบทแล้ว");
      return;
    }

    // สำหรับโปรเจกต์ใหญ่ (>20 บท) ใช้ batch เพื่อไม่ให้ UI ค้าง
    showToast(`⏳ กำลังแปลง ${total} บท...`);
    let processed = [...chapters];
    let idx = 0;
    const BATCH = 10;

    function processBatch(deadline) {
      while (idx < total && (deadline.timeRemaining() > 2 || deadline.didTimeout)) {
        const end = Math.min(idx + BATCH, total);
        for (let i = idx; i < end; i++) {
          processed[i] = { ...processed[i], content: applyTypography(processed[i].content, opts) };
        }
        idx = end;
      }
      if (idx < total) {
        // ยังมีบทค้างอยู่ — รอ idle frame ถัดไป
        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(processBatch, { timeout: 500 });
        } else {
          setTimeout(() => processBatch({ timeRemaining: () => 10, didTimeout: false }), 16);
        }
      } else {
        setChapters([...processed]);
        showToast(`✦ แปลง Typography ${total} บทเรียบร้อย`);
      }
    }

    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(processBatch, { timeout: 500 });
    } else {
      setTimeout(() => processBatch({ timeRemaining: () => 10, didTimeout: false }), 16);
    }
  }

  function handleEditorChange(chId, newValue, el) {
    const opts = settings.typoOptions || DEFAULT_TYPO_OPTIONS;
    const pos = el ? el.selectionStart : newValue.length;
    const { text, cursorDelta } = applyLiveTypography(newValue, pos, opts);
    updateChapter(chId, { content: text });
    if (el && cursorDelta !== 0) {
      requestAnimationFrame(() => {
        const newPos = pos + cursorDelta;
        el.setSelectionRange(newPos, newPos);
      });
    }
  }

  // ─ Export / Import ─
  function exportProject() {
    if (!activeProjectId) return;
    const data = buildProjectData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type:"application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(book.title||"project").replace(/[^a-zA-Z0-9ก-๙]/g,"_")}.novelforge`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("💾 Export โปรเจกต์แล้ว");
  }

  // ─ Save As: export ด้วยชื่อที่กำหนด + หลายฟอร์แมต ─────────────────────────
  const [showSaveAs, setShowSaveAs] = useState(false);

  function doSaveAs({ filename, format }) {
    const safeName = (filename || book.title || "project").replace(/[^a-zA-Z0-9ก-๙\-_. ]/g, "_").trim() || "project";

    if (format === "novelforge") {
      const data = buildProjectData();
      _downloadBlob(JSON.stringify(data, null, 2), `${safeName}.novelforge`, "application/json");
      showToast("💾 บันทึก .novelforge แล้ว");
    } else if (format === "md") {
      const md = _chaptersToMarkdown(chapters, book);
      _downloadBlob(md, `${safeName}.md`, "text/markdown;charset=utf-8");
      showToast("📝 Export Markdown แล้ว");
    } else if (format === "txt") {
      const txt = _chaptersToTxt(chapters, book);
      _downloadBlob(txt, `${safeName}.txt`, "text/plain;charset=utf-8");
      showToast("📄 Export TXT แล้ว");
    } else if (format === "html") {
      const html = _chaptersToHtml(chapters, book, settings, theme);
      _downloadBlob(html, `${safeName}.html`, "text/html;charset=utf-8");
      showToast("🌐 Export HTML แล้ว");
    } else if (format === "pdf") {
      exportPDF();
    } else if (format === "epub") {
      exportEPUB();
    }
    setShowSaveAs(false);
  }

  // ── helpers ──────────────────────────────────────────────────────────────────
  function _downloadBlob(content, filename, type) {
    const blob = new Blob([content], { type });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  function _chaptersToMarkdown(chs, bk) {
    const title = bk?.title || "Untitled";
    const author = bk?.pen || bk?.author || "";
    let out = `# ${title}\n`;
    if (author) out += `**${author}**\n`;
    out += "\n---\n\n";
    chs.forEach((ch, i) => {
      out += `## ${ch.title || `บทที่ ${i + 1}`}\n\n`;
      // แปลง HTML → plain text → Markdown paragraphs
      const plain = stripHtml(ch.content || "");
      const paras = plain.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
      out += paras.join("\n\n");
      out += "\n\n---\n\n";
    });
    return out.trimEnd();
  }

  function _chaptersToTxt(chs, bk) {
    const title = bk?.title || "Untitled";
    const author = bk?.pen || bk?.author || "";
    let out = title + (author ? `\nโดย ${author}` : "") + "\n\n" + "=".repeat(50) + "\n\n";
    chs.forEach((ch, i) => {
      out += `${ch.title || `บทที่ ${i + 1}`}\n${"─".repeat(30)}\n\n`;
      const plain = stripHtml(ch.content || "");
      out += plain.trim() + "\n\n\n";
    });
    return out.trimEnd();
  }

  function _chaptersToHtml(chs, bk, stg, thm) {
    const title  = bk?.title || "Untitled";
    const author = bk?.pen || bk?.author || "";
    const font   = stg?.font || "Sarabun";
    const fs     = stg?.fontSize || 16;
    const lh     = ((stg?.lineHeight || 185) / 100).toFixed(2);
    const bg     = thm?.bg || "#fff";
    const ink    = thm?.ink || "#1a1612";
    let body = "";
    chs.forEach((ch, i) => {
      body += `<section style="margin-bottom:3em">
  <h2 style="color:${thm?.accent||"#8faa8b"};margin-bottom:1em">${ch.title || `บทที่ ${i + 1}`}</h2>
  <div>${ch.content || ""}</div>
</section>\n`;
    });
    return `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;700&display=swap" rel="stylesheet">
<style>
  body { background:${bg}; color:${ink}; font-family:'${font}',sans-serif; font-size:${fs}px; line-height:${lh}; max-width:680px; margin:0 auto; padding:48px 32px; }
  h1 { margin-bottom:.25em } h2 { margin-top:2em }
  p { margin:0 0 .8em; text-align:justify }
</style>
</head>
<body>
<h1>${title}</h1>${author?`<p style="opacity:.55">${author}</p>`:""}
<hr style="margin:2em 0">
${body}
</body>
</html>`;
  }

  function importProject() { loadInput.current?.click(); }

  async function handleImportFile(e) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const d = JSON.parse(ev.target.result);
        if (!d.chapters) { showToast("❌ ไฟล์ไม่ถูกต้อง"); return; }
        // Create as new project with new id
        const p = {
          ...newProject(),
          ...d,
          id: d.id || newId(),
          name: d.book?.title || d.name || "นำเข้าจากไฟล์",
          updatedAt: new Date().toISOString(),
        };
        await dbPut("projects", p);
        setProjects(prev => [p, ...prev.filter(x => x.id !== p.id)]);
        await openProject(p);
        showToast(`📂 นำเข้าสำเร็จ (${d.chapters.length} บท)`);
      } catch(err) { console.error("Import project error:", err); showToast("❌ ไฟล์ไม่ถูกต้อง"); }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  // ─ Import DOCX ─
  async function handleImportDOCX(e) {
    const file = e.target.files[0]; if (!file) return;
    showToast("⏳ กำลังแปลง DOCX...");
    try {
      if (!window.mammoth) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js");
      const arrayBuffer = await file.arrayBuffer();

      // Style map: แปลง toc/index/header/footer styles เป็น <ignore> tag พิเศษ
      const result = await window.mammoth.convertToHtml({ arrayBuffer }, {
        styleMap: [
          "p[style-name='toc 1'] => p.nfa-ignore:fresh",
          "p[style-name='toc 2'] => p.nfa-ignore:fresh",
          "p[style-name='toc 3'] => p.nfa-ignore:fresh",
          "p[style-name='TOC 1'] => p.nfa-ignore:fresh",
          "p[style-name='TOC 2'] => p.nfa-ignore:fresh",
          "p[style-name='Index'] => p.nfa-ignore:fresh",
          "p[style-name='Header'] => p.nfa-ignore:fresh",
          "p[style-name='Footer'] => p.nfa-ignore:fresh",
          "p[style-name='Heading 1'] => h1:fresh",
          "p[style-name='Heading 2'] => h2:fresh",
          "p[style-name='Heading 3'] => h3:fresh",
        ]
      });
      const html = result.value || "";

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const nodes = Array.from(doc.body.childNodes);

      const projName = file.name.replace(/\.docx$/i, "");
      let chaptersArr = [];
      let currentTitle = projName;
      let currentParas = [];

      // กรองขยะ: % เดี่ยว, tab+เลขหน้า (จาก toc), สั้นมาก
      function isJunk(text) {
        if (/^\d+(\.\d+)?%/.test(text)) return true;          // 2.9%, 3.2%...
        if (/^[\d\s%\.]+$/.test(text)) return true;           // ตัวเลขล้วน
        if (/\t\d+$/.test(text)) return true;                 // "ชื่อบท\t123" (toc entry)
        return false;
      }

      function flushChapter() {
        if (currentParas.length === 0) return;
        const htmlContent = currentParas
          .map(p => p.trim()).filter(Boolean)
          .map(p => `<p>${p}</p>`).join("");
        if (htmlContent.length > 0) {
          chaptersArr.push({ id: newId(), title: currentTitle, content: htmlContent, note: "" });
        }
        currentParas = [];
      }

      for (const node of nodes) {
        const tag = node.nodeName.toLowerCase();
        const text = (node.textContent || "").trim();

        // ข้าม nfa-ignore (toc/header/footer styles)
        if (node.classList?.contains("nfa-ignore")) continue;
        if (!text) continue;
        if (isJunk(text)) continue;

        // h1/h2/h3 (Heading style จาก Word) → chapter break
        if (tag === "h1" || tag === "h2" || tag === "h3") {
          flushChapter();
          currentTitle = text;
          continue;
        }

        if (tag === "p") {
          const looksLikeChapterHead =
            /^(บทที่|บท|Chapter|CHAPTER|ตอนที่|ตอน)\s*\d+/i.test(text) ||
            (text.length <= 60 && /^(บทนำ|ปฐมบท|บทส่งท้าย|บทอวสาน|บทพิเศษ|ตอนพิเศษ|ตอนนำ|ตอนท้าย|PROLOGUE|Prologue|Epilogue|Interlude|Afterword|Foreword|Introduction|Conclusion|Side\s*Story|Bonus\s*(Chapter|Episode)|Extra\s*(Chapter|Episode))\b/i.test(text));

          if (looksLikeChapterHead) {
            flushChapter();
            currentTitle = text;
            continue;
          }

          // เนื้อหาปกติ — เก็บ innerHTML เพื่อรักษา bold/italic
          const inner = node.innerHTML
            .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"').trim();
          if (inner) currentParas.push(inner);
        } else {
          if (text) currentParas.push(text);
        }
      }
      flushChapter();

      if (chaptersArr.length === 0) {
        chaptersArr = [{ id: newId(), title: projName, content: "<p>" + doc.body.textContent.trim() + "</p>", note: "" }];
      }

      const p = newProject({
        name: projName,
        book: { ...defaultBook(), title: projName },
        chapters: chaptersArr,
      });
      await dbPut("projects", p);
      setProjects(prev => [p, ...prev]);
      await openProject(p);
      showToast(`✅ Import DOCX สำเร็จ! ${chaptersArr.length} บท`);
    } catch(err) {
      console.error("Import DOCX error:", err);
      showToast("❌ Import DOCX ผิดพลาด: " + err.message);
    }
    e.target.value = "";
  }

  // ─ Import Markdown ─
  async function handleImportMarkdown(e) {
    const file = e.target.files[0]; if (!file) return;
    showToast("⏳ กำลังแปลง Markdown...");
    try {
      const text = await file.text();
      // Split by # headings (H1/H2)
      const sections = text.split(/(?=^#{1,2} )/m).filter(s => s.trim());
      let chaptersArr = [];

      if (sections.length <= 1) {
        // No headings — treat whole file as one chapter
        chaptersArr = [{ id:newId(), title:file.name.replace(/\.md$/i,""), content:text.replace(/^#{1,6} .+\n?/gm,"").trim(), note:"" }];
      } else {
        for (const sec of sections) {
          const headingMatch = sec.match(/^(#{1,2})\s+(.+)/);
          const title = headingMatch ? headingMatch[2].trim() : "บท";
          const body = sec.replace(/^#{1,2} .+\n?/, "")
            .replace(/#{1,6} /g, "")          // strip subheadings
            .replace(/\*\*(.*?)\*\*/g, "$1")  // bold
            .replace(/\*(.*?)\*/g, "$1")       // italic
            .replace(/`(.*?)`/g, "$1")         // inline code
            .replace(/^\s*[-*+] /gm, "• ")     // lists
            .replace(/^\s*\d+\. /gm, "")       // numbered lists
            .trim();
          if (body.length > 0) {
            chaptersArr.push({ id:newId(), title, content:body, note:"" });
          }
        }
      }
      if (chaptersArr.length === 0) {
        chaptersArr = [{ id:newId(), title:file.name.replace(/\.md$/i,""), content:text, note:"" }];
      }

      const projName = file.name.replace(/\.md$/i,"");
      const p = newProject({
        name: projName,
        book: { ...defaultBook(), title: projName },
        chapters: chaptersArr,
      });
      await dbPut("projects", p);
      setProjects(prev => [p, ...prev]);
      await openProject(p);
      showToast(`✅ Import Markdown สำเร็จ! ${chaptersArr.length} บท`);
    } catch(err) {
      console.error("Import Markdown error:", err);
      showToast("❌ Import Markdown ผิดพลาด: " + err.message);
    }
    e.target.value = "";
  }

  // ─ Import EPUB ─
  async function handleImportEPUB(e) {
    const file = e.target.files[0]; if (!file) return;
    showToast("⏳ กำลังแปลง EPUB...");
    try {
      if (!window.JSZip) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");
      const arrayBuffer = await file.arrayBuffer();
      const zip = await window.JSZip.loadAsync(arrayBuffer);

      // Parse content.opf to get spine order
      let opfPath = "OEBPS/content.opf";
      // Check container.xml for real opf path
      const containerFile = zip.file("META-INF/container.xml");
      if (containerFile) {
        const containerXml = await containerFile.async("text");
        const match = containerXml.match(/full-path="([^"]+\.opf)"/);
        if (match) opfPath = match[1];
      }

      const opfFile = zip.file(opfPath);
      if (!opfFile) throw new Error("ไม่พบ content.opf");
      const opfXml = await opfFile.async("text");

      // Get spine order
      const spineMatches = [...opfXml.matchAll(/idref="([^"]+)"/g)].map(m => m[1]);
      // Get manifest items (id -> href)
      const manifestItems = {};
      for (const m of opfXml.matchAll(/<item[^>]+id="([^"]+)"[^>]+href="([^"]+)"[^>]*>/g)) {
        manifestItems[m[1]] = m[2];
      }
      // Get book title
      const titleMatch = opfXml.match(/<dc:title[^>]*>([^<]+)<\/dc:title>/);
      const authorMatch = opfXml.match(/<dc:creator[^>]*>([^<]+)<\/dc:creator>/);
      const projName = titleMatch ? titleMatch[1].trim() : file.name.replace(/\.epub$/i,"");

      // Parse chapters from spine
      const basePath = opfPath.includes("/") ? opfPath.substring(0, opfPath.lastIndexOf("/")+1) : "";
      const chaptersArr = [];

      for (const idref of spineMatches) {
        const href = manifestItems[idref];
        if (!href) continue;
        // Skip toc/nav files
        if (/toc|nav|ncx/i.test(href)) continue;
        const fullPath = href.startsWith("/") ? href.slice(1) : basePath + href;
        const chFile = zip.file(fullPath) || zip.file(href);
        if (!chFile) continue;

        const html = await chFile.async("text");
        // Extract title from h1/h2 or title tag
        const titleEl = html.match(/<(?:h1|h2)[^>]*>([^<]+)<\/(?:h1|h2)>/i) ||
                        html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const chTitle = titleEl ? titleEl[1].replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").trim() : `บท ${chaptersArr.length+1}`;

        // Strip HTML tags and decode entities
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const bodyHtml = bodyMatch ? bodyMatch[1] : html;
        const plainText = bodyHtml
          .replace(/<(?:h[1-6])[^>]*>([\s\S]*?)<\/h[1-6]>/gi, "\n\n$1\n\n")
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n")
          .replace(/<[^>]+>/g, "")
          .replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")
          .replace(/&quot;/g,'"').replace(/&#39;/g,"'")
          .replace(/\n{3,}/g,"\n\n")
          .trim();

        if (plainText.length > 50) {
          chaptersArr.push({ id:newId(), title:chTitle, content:plainText, note:"" });
        }
      }

      if (chaptersArr.length === 0) throw new Error("ไม่พบเนื้อหาในไฟล์ EPUB");

      const p = newProject({
        name: projName,
        book: { ...defaultBook(), title:projName, author: authorMatch ? authorMatch[1].trim() : "" },
        chapters: chaptersArr,
      });
      await dbPut("projects", p);
      setProjects(prev => [p, ...prev]);
      await openProject(p);
      showToast(`✅ Import EPUB สำเร็จ! ${chaptersArr.length} บท`);
    } catch(err) {
      console.error("Import EPUB error:", err);
      showToast("❌ Import EPUB ผิดพลาด: " + err.message);
    }
    e.target.value = "";
  }

  function calcPageNumbers() {
    const lineHeightPx = settings.fontSize * ((settings.paragraphFormat?.lineHeight || settings.lineHeight || 185) / 100);
    const linesPerPage = Math.max(1, Math.floor((layoutSize.px.h - (settings.marginV || 56) * 2) / lineHeightPx));
    const charsPerLine = Math.max(1, Math.floor((layoutSize.px.w - (settings.marginH || 52) * 2) / (settings.fontSize * 0.55)));
    const wordsPerLine = Math.max(1, Math.floor(charsPerLine / 5));
    const wordsPerPage = Math.max(1, linesPerPage * wordsPerLine);
    let cumWords = 0;
    let startPage = 3; // cover=1, toc=2
    return chapters.map((ch) => {
      const page = startPage + Math.floor(cumWords / wordsPerPage);
      cumWords += wordCount(ch.content);
      return { ...ch, pageNum: page };
    });
  }

  // ─ Export PDF ─
  async function exportPDF() {
    showToast("⏳ กำลังสร้าง PDF...");
    try {
      if (!window.html2canvas) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
      if (!window.jspdf) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation:"portrait", unit:"mm", format:"a5" });
      const W=148, H=210;
      // Inject image markers into DOM before capture
      const { byChapter } = buildPDFImageManifest(images);
      const pages = document.querySelectorAll(".page-for-export");
      let first = true;
      for (const page of pages) {
        const canvas = await html2canvas(page, { scale:2, useCORS:true, backgroundColor:theme.bg, logging:false });
        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        if (!first) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, W, H);
        first = false;
      }
      pdf.save(`${(book.title||"ebook").replace(/[^a-zA-Z0-9ก-๙]/g,"_")}_A5.pdf`);
      showToast("✅ Export PDF เรียบร้อย!");
    } catch(e) { showToast("❌ PDF error: " + e.message); }
  }

  // ─ Export EPUB ─
  async function exportEPUB() {
    showToast("⏳ กำลังสร้าง EPUB...");
    try {
      if (!window.JSZip) await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");
      const zip = new window.JSZip();
      const slug = (book.title||"ebook").replace(/[^a-zA-Z0-9ก-๙]/g,"_");
      const uid = `urn:uuid:${slug}-${Date.now()}`;

      // mimetype (must be first, uncompressed)
      zip.file("mimetype", "application/epub+zip", { compression:"STORE" });

      // META-INF/container.xml
      zip.folder("META-INF").file("container.xml",
`<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`);

      const oebps = zip.folder("OEBPS");
      const chWithPages = calcPageNumbers();

      // CSS
      oebps.file("style.css",
`@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap');
body { font-family: 'Sarabun', sans-serif; font-size: ${settings.fontSize}px; line-height: ${settings.lineHeight/100}; margin: ${settings.marginV}px ${settings.marginH}px; text-align: ${settings.textAlign}; color: #1a1612; background: #fffef9; }
h1 { font-size: 1.4em; font-weight: 800; text-align: center; margin-bottom: 1.5em; color: #8b4513; }
h2 { font-size: 1.1em; font-weight: 700; text-align: center; margin: 0.5em 0 0.3em; color: #8b4513; opacity: 0.5; letter-spacing: 0.15em; text-transform: uppercase; }
p { margin: 0 0 0.8em; }
p:first-of-type::first-letter { float: left; font-size: 3em; line-height: 0.8; margin-right: 6px; margin-top: 4px; font-weight: 700; color: #8b4513; }
.toc-entry { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dotted #ccc; font-size: 0.95em; }
.toc-page { opacity: 0.6; font-size: 0.85em; }
.divider { text-align: center; margin: 1.5em 0; letter-spacing: 6px; opacity: 0.4; }
.divider-svg { text-align: center; margin: 1.5em 0; color: #444; }
.divider-svg svg { max-width: 100%; height: 40px; }
.divider-img { text-align: center; margin: 1.5em 0; }
.divider-img img { max-width: 100%; height: 60px; object-fit: cover; opacity: 0.55; }
`);

      // TOC page with real page numbers
      const tocHTML = chWithPages.map(ch =>
        `<div class="toc-entry"><span>${ch.title}</span><span class="toc-page">${ch.pageNum}</span></div>`
      ).join("\n");

      oebps.file("toc.xhtml",
`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="th">
<head><meta charset="UTF-8"/><title>สารบัญ</title><link rel="stylesheet" href="style.css"/></head>
<body>
<h1>สารบัญ</h1>
${tocHTML}
</body>
</html>`);

      // Chapter files
      const chapterItems = [];
      const { manifestItems: imgManifest, spineItems: imgSpineItems, inlineByChapter } = buildEPUBImageManifest(images);

      // Add image files to zip
      for (const meta of imgManifest) {
        const imgObj = images.find(img => `image-${img.id}` === meta.id);
        if (imgObj?.src) {
          const base64 = imgObj.src.split(",")[1] || "";
          if (base64) oebps.file(meta.href, base64, { base64: true });
        }
      }

      chapters.forEach((ch, i) => {
        const id = `ch${i+1}`;
        // content is stored as HTML from the rich editor — use directly
        let paras = ch.content || "";
        // If content looks like plain text (no HTML tags), convert to paragraphs
        if (paras && !/<[a-z][\s\S]*>/i.test(paras)) {
          paras = paras.split(/\n\n+/).filter(Boolean)
            .map(p => `<p>${p.replace(/\n/g,"<br/>")}</p>`).join("\n");
        }
        // Replace [IMAGE:id] markers with inline HTML
        const chImgMeta = inlineByChapter[ch.id] || [];
        for (const imgMeta of chImgMeta) {
          paras = paras.replace(`[IMAGE:${imgMeta.id}]`, imgMeta.inlineHTML || "");
        }
        oebps.file(`${id}.xhtml`,
`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="th">
<head><meta charset="UTF-8"/><title>${ch.title}</title><link rel="stylesheet" href="style.css"/></head>
<body>
<h2>บทที่ ${i+1}</h2>
<h1>${ch.title}</h1>
${(()=>{
  const decor = settings.dividerDecor || { type:"text" };
  if (decor.type === "image" && decor.imgUrl) {
    return `<div class="divider-img"><img src="${decor.imgUrl}" alt="divider"/></div>`;
  }
  if (decor.type === "svg" && decor.svgId) {
    const orn = SVG_ORNAMENTS.find(o=>o.id===decor.svgId);
    return orn ? `<div class="divider-svg">${orn.svg}</div>` : `<div class="divider">${settings.divider||"◆◆◆"}</div>`;
  }
  return `<div class="divider">${settings.divider||"◆◆◆"}</div>`;
})()}
${paras}
</body>
</html>`);
        chapterItems.push({ id, title: ch.title, file: `${id}.xhtml` });
      });

      // content.opf
      const epubManifestItems = [
        `<item id="style" href="style.css" media-type="text/css"/>`,
        `<item id="toc-page" href="toc.xhtml" media-type="application/xhtml+xml"/>`,
        ...chapterItems.map(c => `<item id="${c.id}" href="${c.file}" media-type="application/xhtml+xml"/>`),
        `<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>`,
        ...imgManifest.map(item => { const p=item.properties?` properties="${item.properties}"`:""; return `<item id="${item.id}" href="${item.href}" media-type="${item.mediaType}"${p}/>`; }),
      ].join("\n    ");
      const epubSpineItems = [
        `<itemref idref="toc-page"/>`,
        ...chapterItems.map(c => `<itemref idref="${c.id}"/>`),
        ...imgSpineItems.map(s => `<itemref idref="${s.idref}" linear="${s.linear||'yes'}"/>`),
      ].join("\n    ");

      oebps.file("content.opf",
`<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="uid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
    <dc:title>${book.title||"Untitled"}</dc:title>
    <dc:creator opf:role="aut">${book.pen||book.author||"ผู้แต่ง"}</dc:creator>
    <dc:language>th</dc:language>
    <dc:identifier id="uid">${uid}</dc:identifier>
    <dc:publisher>${book.publisher||""}</dc:publisher>
    <dc:date>${book.year||new Date().getFullYear()}</dc:date>
  </metadata>
  <manifest>
    ${epubManifestItems}
  </manifest>
  <spine toc="ncx">
    ${epubSpineItems}
  </spine>
</package>`);

      // toc.ncx
      const navPoints = chapterItems.map((c,i) =>
        `<navPoint id="nav${i+1}" playOrder="${i+2}">
      <navLabel><text>${c.title}</text></navLabel>
      <content src="${c.file}"/>
    </navPoint>`).join("\n  ");

      oebps.file("toc.ncx",
`<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head><meta name="dtb:uid" content="${uid}"/></head>
  <docTitle><text>${book.title||"Untitled"}</text></docTitle>
  <navMap>
    <navPoint id="nav0" playOrder="1">
      <navLabel><text>สารบัญ</text></navLabel>
      <content src="toc.xhtml"/>
    </navPoint>
  ${navPoints}
  </navMap>
</ncx>`);

      const blob = await zip.generateAsync({ type:"blob", mimeType:"application/epub+zip" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `${slug}.epub`; a.click();
      URL.revokeObjectURL(url);
      showToast(`✅ Export EPUB สำเร็จ! (${chapters.length} บท)`);
    } catch(e) { showToast("❌ EPUB error: " + e.message); console.error(e); }
  }

  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement("script"); s.src = src;
      s.onload = res; s.onerror = () => rej(new Error("Load failed: " + src));
      document.head.appendChild(s);
    });
  }

  // ─ Find & Replace ─
  function doSearchCount() {
    if (!frQuery) { setFrCount(null); return; }
    const rx = new RegExp(frQuery.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"), "gi");
    let total = 0;
    chapters.forEach(c => { const m = stripHtml(c.content||"").match(rx); if (m) total += m.length; });
    setFrCount(total);
  }
  function doReplaceAll() {
    if (!frQuery) return;
    const rx = new RegExp(frQuery.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"), "gi");
    let total = 0;
    setChapters(prev => prev.map(c => {
      const before = c.content || "";
      // replace inside text nodes only — swap text in HTML safely
      const plain = stripHtml(before);
      const m = plain.match(rx);
      if (m) {
        total += m.length;
        // simple: replace in raw HTML string (avoids tag corruption for most cases)
        return {...c, content: before.replace(rx, frReplace)};
      }
      return c;
    }));
    showToast(`✅ แทนที่ ${total} รายการ`);
    setFrCount(0);
  }

  // ─ Cover ─
  function handleCoverImage(e) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setSetting("coverImageData", ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  }
  function handleBackCoverImage(e) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setSetting("backCoverImageData", ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  // ─ Assets ─
  async function handleAssetUpload(e, category = "อื่นๆ") {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    for (const file of files) {
      const reader = new FileReader();
      await new Promise(resolve => {
        reader.onload = async (ev) => {
          const asset = {
            id: newId(),
            projectId: activeProjectId,
            name: file.name,
            category,
            data: ev.target.result,
            size: file.size,
            type: file.type,
            createdAt: new Date().toISOString(),
          };
          await dbPut("assets", asset);
          setAssets(prev => [...prev, asset]);
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }
    showToast(`📁 อัพโหลด ${files.length} ไฟล์แล้ว`);
    e.target.value = "";
  }

  async function deleteAsset(id) {
    await dbDelete("assets", id);
    setAssets(prev => prev.filter(a => a.id !== id));
    showToast("🗑 ลบ Asset แล้ว");
  }

  function useAssetAsCover(asset) {
    setSetting("coverImageData", asset.data);
    showToast("🎨 ตั้งเป็นปกหน้าแล้ว");
  }
  function useAssetAsBackCover(asset) {
    setSetting("backCoverImageData", asset.data);
    showToast("🎨 ตั้งเป็นปกหลังแล้ว");
  }

  // ─ AI ─
  function saveAiKeys(keys) {
    dispatchAi({ type: "SET_KEYS", value: keys });
    try {
      sessionStorage.setItem("nfa_ai_keys", JSON.stringify(keys)); // ⚠️ plaintext in sessionStorage — Direct mode only
    } catch(e) { console.error("Failed to save AI keys to sessionStorage:", e); }
  }
  function saveAiProvider(p) {
    dispatchAi({ type: "SET_PROVIDER", value: p });
    try {
      sessionStorage.setItem("nfa_ai_provider", p);
    } catch(e) { console.error("Failed to save AI provider to sessionStorage:", e); }
  }

  async function runAI(prompt) {
    dispatchAi({ type: "RUN_START" });
    try {
      let text = "";

      if (aiProxyMode) {
        // ── Proxy Mode: key never leaves the server ──────────────────────────
        text = await callAIViaProxy(aiProvider, prompt);

      } else {
        // ── Direct Mode: key sent from browser (dev/personal use only) ───────
        const key = aiKeys[aiProvider];
        if (!key) {
          setShowAiSettings(true);
          dispatchAi({ type: "RUN_DONE", value: "⚠️ กรุณาใส่ API Key ก่อนใช้งาน — กดปุ่ม ⚙️ Settings ด้านบน" });
          return;
        }
        if (aiProvider === "claude") {
          const res = await fetch("https://api.anthropic.com/v1/messages", {
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              "x-api-key": key,
              "anthropic-version":"2023-06-01",
              "anthropic-dangerous-direct-browser-access":"true",
            },
            body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1500, messages:[{ role:"user", content:prompt }] }),
          });
          const data = await res.json();
          if (data.error) throw new Error(data.error.message);
          text = data.content?.map(i => i.text||"").join("\n") || "ไม่ได้รับผล";
        } else if (aiProvider === "gemini") {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body: JSON.stringify({ contents:[{ parts:[{ text: prompt }] }], generationConfig:{ maxOutputTokens:1500 } }),
          });
          const data = await res.json();
          if (data.error) throw new Error(data.error.message);
          text = data.candidates?.[0]?.content?.parts?.[0]?.text || "ไม่ได้รับผล";
        } else if (aiProvider === "gpt") {
          const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method:"POST",
            headers:{ "Content-Type":"application/json", "Authorization": `Bearer ${key}` },
            body: JSON.stringify({ model:"gpt-4o-mini", max_tokens:1500, messages:[{ role:"user", content:prompt }] }),
          });
          const data = await res.json();
          if (data.error) throw new Error(data.error.message);
          text = data.choices?.[0]?.message?.content || "ไม่ได้รับผล";
        }
      }

      dispatchAi({ type: "RUN_DONE", value: text });
    } catch(e) {
      console.error("AI API error:", e);
      dispatchAi({ type: "RUN_ERROR", error: e.message });
    }
  }

  function buildAIPrompt() {
    const ctx = `ชื่อหนังสือ: ${book.title}\nแนว: ${book.genre}\nตัวละครหลัก: ${characters.map(c=>c.name).join(", ")}\nสถานที่: ${world.locations.map(l=>l.name).join(", ")}`;
    if (aiTab === "character") return `คุณเป็น AI ช่วยนักเขียนนิยายไทย\nบริบทโปรเจกต์:\n${ctx}\n\nช่วยสร้างตัวละครใหม่สำหรับ: "${aiInput||"ตัวละครสนับสนุน"}"\nรูปแบบ: ชื่อ, อายุ, บทบาท, บุคลิก, จุดแข็ง/อ่อน, ประวัติสั้น, ความสัมพันธ์กับตัวละครหลัก\nตอบเป็นภาษาไทย ละเอียดและสร้างสรรค์`;
    if (aiTab === "outline") return `คุณเป็น AI ช่วยนักเขียนนิยายไทย\nบริบทโปรเจกต์:\n${ctx}\n\nช่วยสร้าง Outline บท สำหรับ: "${aiInput||"บทถัดไปของเรื่อง"}"\nบทที่มีแล้ว: ${chapters.map((c,i)=>`${i+1}. ${c.title}`).join(", ")}\nตอบเป็นภาษาไทย พร้อม 5-7 ประเด็นสำคัญที่ควรเกิดในบทนี้`;
    if (aiTab === "synopsis") return `คุณเป็น AI ช่วยนักเขียนนิยายไทย\nบริบทโปรเจกต์:\n${ctx}\n\nช่วยเขียน Synopsis สำหรับ: "${aiInput||book.title}"\nเนื้อหาที่มี: ${chapters.slice(0,3).map(c=>stripHtml(c.content).substring(0,200)).join("...")}\nตอบเป็นภาษาไทย ยาว 2-3 ย่อหน้า สำหรับใช้โปรโมทหนังสือ`;
    if (aiTab === "consistency") {
      const allText = chapters.map(c=>`[${c.title}]: ${stripHtml(c.content).substring(0,500)}`).join("\n\n");
      const charInfo = characters.map(c=>`${c.name} (อายุ: ${c.age}, สถานะ: ${c.status})`).join(", ");
      return `คุณเป็น AI ตรวจสอบความสอดคล้องของนิยายไทย\nตัวละคร: ${charInfo}\n\nเนื้อหาบท:\n${allText}\n\nตรวจสอบ:\n1. อายุตัวละครสอดคล้องกันทุกบทหรือไม่\n2. สถานะตัวละคร ถูกต้องหรือไม่\n3. มีความขัดแย้งใดในเนื้อเรื่องหรือไม่\nตอบเป็นภาษาไทย ระบุปัญหาชัดเจน`;
    }
    if (aiTab === "continue") {
      const lastCh = chapters[chapters.length-1];
      const lastPara = stripHtml(lastCh?.content||"").split("\n\n").filter(Boolean).slice(-3).join("\n\n");
      return `คุณเป็น AI ช่วยนักเขียนนิยายไทย\nบริบทโปรเจกต์:\n${ctx}\n\nย่อหน้าสุดท้าย:\n${lastPara}\n\nคำแนะนำ: ${aiInput||"เขียนต่อตามสไตล์เดิม"}\nช่วยเขียนต่อจากย่อหน้าสุดท้าย ความยาว 3-5 ย่อหน้า ตอบเป็นภาษาไทย`;
    }
    if (aiTab === "dialogue") {
      return `คุณเป็น AI ช่วยนักเขียนนิยายไทย\nบริบทโปรเจกต์:\n${ctx}\n\nช่วยเขียนบทสนทนาระหว่าง: ${aiInput||"ตัวละครหลัก 2 คน"}\nเขียนบทสนทนาที่สมจริง มีอารมณ์ สะท้อนบุคลิกตัวละคร ความยาว 10-15 บรรทัด ตอบเป็นภาษาไทย`;
    }
    return `ช่วย: ${aiInput}`;
  }

  // ─── STYLES ──────────────────────────────────────────────────────────────────
  const _pageCSS = useMemo(
    () => buildPageCSS(settings, layoutSize, settings.paragraphFormat||{}, theme),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [settings.font, settings.fontSize, settings.layout, settings.marginV, settings.marginH,
     settings.paragraphFormat, settings.theme, settings.colorPalette, layoutSize]
  );
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&family=Noto+Serif+Thai:wght@300;400;500;600;700&family=Kanit:wght@300;400;500;600&family=Prompt:wght@300;400;500;600&family=Mitr:wght@300;400;500;600&family=Charm:wght@400;700&family=Lora:wght@400;500;600&family=Merriweather:wght@300;400;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    ::-webkit-scrollbar{width:5px;height:5px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:${theme.border};border-radius:10px}
    button{cursor:pointer;font-family:inherit}
    input,textarea,select{font-family:inherit}
    .snav-btn{display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;border:none;background:transparent;color:${theme.ink};opacity:.55;font-size:9px;width:100%;border-radius:6px;transition:.15s;cursor:pointer;line-height:1.2}
    .snav-btn:hover,.snav-btn.active{opacity:1;background:${theme.border}44;color:${theme.accent}}
    .snav-icon{font-size:16px;margin-bottom:1px}
    .ch-item{display:flex;align-items:center;gap:6px;padding:8px 10px;border-radius:8px;cursor:pointer;border:1px solid transparent;transition:.15s;font-size:13px}
    .ch-item:hover{background:${theme.border}55}
    .ch-item.active{background:${theme.accentLight};border-color:${theme.accent}44;color:${theme.accent}}
    .btn{padding:4px 8px;border:1px solid ${theme.border};background:transparent;border-radius:6px;font-size:12px;color:${theme.ink};opacity:.75;transition:.15s}
    .btn:hover{opacity:1;background:${theme.border}55}
    .accent-btn{padding:7px 16px;background:${theme.accent};color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;transition:.15s}
    .accent-btn:hover{filter:brightness(1.1)}
    .slider-row{display:flex;align-items:center;gap:8px;margin-bottom:10px}
    .slider-row label{font-size:11px;opacity:.7;width:80px;flex-shrink:0}
    .slider-row input[type=range]{flex:1;accent-color:${theme.accent}}
    .slider-row span{font-size:11px;opacity:.8;width:36px;text-align:right;flex-shrink:0}
    .sec-head{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;opacity:.6;margin:14px 0 8px;padding-bottom:4px;border-bottom:1px solid ${theme.border}}
    .cover-tpl-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:10px}
    .cover-tpl{height:54px;border-radius:8px;border:2px solid transparent;cursor:pointer;transition:.15s}
    .cover-tpl:hover,.cover-tpl.active{border-color:${theme.accent};transform:scale(1.05)}
    .stat-card{padding:10px 12px;background:${theme.border}33;border-radius:10px;text-align:center}
    .stat-card .val{font-size:18px;font-weight:700;color:${theme.accent}}
    .stat-card .lbl{font-size:10px;opacity:.55;margin-top:2px}
    .theme-btn{padding:6px 12px;border:1.5px solid ${theme.border};border-radius:20px;font-size:12px;background:transparent;color:${theme.ink};cursor:pointer;transition:.15s}
    .theme-btn.active{background:${theme.accent};color:#fff;border-color:${theme.accent}}
    .divider-btn{padding:5px 10px;border:1.5px solid ${theme.border};border-radius:8px;font-size:14px;background:transparent;color:${theme.ink};cursor:pointer;transition:.15s}
    .divider-btn.active{background:${theme.accentLight};border-color:${theme.accent};color:${theme.accent}}
    .modal-bg{position:fixed;inset:0;background:#00000088;z-index:2000;display:flex;align-items:center;justify-content:center}
    .modal-box{background:${theme.panel};border:1px solid ${theme.border};border-radius:16px;padding:24px;min-width:340px;max-width:640px;width:90%;max-height:80vh;overflow-y:auto}
    textarea.editor{width:100%;resize:none;border:none;outline:none;background:transparent;color:${theme.ink};line-height:${((settings.paragraphFormat?.lineHeight||settings.lineHeight||185)/100).toFixed(2)};font-family:'${settings.font}','Noto Serif Thai','Sarabun',sans-serif;font-size:${settings.fontSize}px;text-align:${settings.paragraphFormat?.textAlign||settings.textAlign||'justify'};text-indent:${(settings.paragraphFormat?.firstLineIndent??2)>0?(settings.paragraphFormat?.firstLineIndent??2)+'em':'0'};padding:0;caret-color:${theme.accent};word-break:normal;overflow-wrap:anywhere;line-break:strict;hyphens:none}
    ${_pageCSS}
    .menubar{display:flex;align-items:center;gap:0;height:32px;border-bottom:1px solid ${theme.border};flex-shrink:0}
    .menu-item{padding:4px 12px;font-size:12px;cursor:pointer;opacity:.7;transition:.1s;border-radius:4px;white-space:nowrap;border:none;background:transparent;color:${theme.ink}}
    .menu-item:hover{opacity:1;background:${theme.border}55}
    .statusbar{display:flex;align-items:center;gap:16px;padding:0 16px;height:30px;font-size:11px;opacity:.8;border-top:1px solid ${theme.border};flex-shrink:0;overflow:hidden}
    .layout-preset{padding:5px 10px;border:1.5px solid ${theme.border};border-radius:8px;font-size:11px;cursor:pointer;transition:.15s;text-align:center;background:transparent;color:${theme.ink}}
    .layout-preset:hover,.layout-preset.active{border-color:${theme.accent};background:${theme.accentLight};color:${theme.accent}}
    .layout-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:10px}
    .font-btn{padding:5px 8px;border:1.5px solid ${theme.border};border-radius:8px;font-size:12px;cursor:pointer;transition:.15s;background:transparent;color:${theme.ink};text-align:center}
    .font-btn:hover,.font-btn.active{border-color:${theme.accent};background:${theme.accentLight};color:${theme.accent}}
    .book-field{width:100%;padding:6px 8px;background:${theme.bg};border:1.5px solid ${theme.border};border-radius:8px;font-size:13px;color:${theme.ink};outline:none;margin-bottom:6px}
    .book-field:focus{border-color:${theme.accent}}
    .check-row{display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:13px}
    .check-row input{accent-color:${theme.accent}}
    @keyframes mic-pulse{0%,100%{box-shadow:0 0 0 3px #ef444433}50%{box-shadow:0 0 0 6px #ef444411}}
    /* page-for-export styles now generated by buildPageCSS() below */
    .home-btn{padding:12px 20px;border:1.5px solid ${theme.border};border-radius:12px;background:${theme.panel};color:${theme.ink};font-size:14px;font-weight:500;cursor:pointer;transition:.2s;text-align:left;display:flex;align-items:center;gap:10px;width:100%}
    .home-btn:hover{border-color:${theme.accent};color:${theme.accent};transform:translateY(-1px);box-shadow:0 4px 16px ${theme.accent}22}
    .tab-btn{padding:7px 14px;border:none;border-radius:8px;font-size:13px;cursor:pointer;transition:.15s;background:transparent;color:${theme.ink};opacity:.6;font-weight:500}
    .tab-btn:hover{opacity:.9;background:${theme.border}44}
    .tab-btn.active{background:${theme.accentLight};color:${theme.accent};opacity:1;font-weight:700}
    .char-card{padding:14px;border:1.5px solid ${theme.border};border-radius:12px;cursor:pointer;transition:.2s;position:relative}
    .char-card:hover{border-color:${theme.accent}66;box-shadow:0 4px 20px ${theme.accent}11;transform:translateY(-2px)}
    .timeline-item{display:flex;gap:16px;padding-bottom:24px;position:relative}
    .timeline-item:not(:last-child)::after{content:"";position:absolute;left:19px;top:40px;bottom:0;width:2px;background:${theme.border};z-index:0}
    .timeline-dot{width:38px;height:38px;border-radius:50%;background:${theme.accent};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;font-weight:700;color:#fff;z-index:1;position:relative;box-shadow:0 0 0 4px ${theme.accentLight}}
    .world-card{padding:12px;border:1px solid ${theme.border};border-radius:10px;transition:.15s}
    .world-card:hover{border-color:${theme.accent}44;background:${theme.border}22}
    .ai-tab-btn{padding:6px 12px;border:1.5px solid ${theme.border};border-radius:20px;font-size:12px;cursor:pointer;background:transparent;color:${theme.ink};transition:.15s}
    .ai-tab-btn.active{background:${theme.accent};color:#fff;border-color:${theme.accent}}
    .ai-result-box{background:${theme.border}22;border:1px solid ${theme.border};border-radius:12px;padding:16px;font-size:13px;line-height:1.7;white-space:pre-wrap;max-height:300px;overflow-y:auto}
    select.book-field{appearance:none}
    .badge{display:inline-block;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700}
    .project-card{padding:16px;border:1.5px solid ${theme.border};border-radius:14px;cursor:pointer;transition:.2s;background:${theme.panel}}
    .project-card:hover{border-color:${theme.accent}66;box-shadow:0 4px 24px ${theme.accent}11;transform:translateY(-2px)}
    .structure-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid ${theme.border};border-radius:10px;background:${theme.panel};margin-bottom:6px;transition:.15s}
    .structure-item:hover{border-color:${theme.accent}55}
    .asset-card{padding:12px;border:1px solid ${theme.border};border-radius:10px;background:${theme.panel};transition:.15s;cursor:pointer}
    .asset-card:hover{border-color:${theme.accent}55;transform:translateY(-1px)}
    .sp-type-btn{padding:8px 12px;border:1.5px solid ${theme.border};border-radius:10px;font-size:12px;cursor:pointer;background:transparent;color:${theme.ink};transition:.15s;text-align:center}
    .sp-type-btn:hover{border-color:${theme.accent};background:${theme.accentLight};color:${theme.accent}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
    .fade-in{animation:fadeIn .2s ease}
    /* ── Paragraph Focus Mode ── */
    .para-focus-mode .ql-editor p { opacity: 0.2; transition: opacity .25s; }
    .para-focus-mode .ql-editor p:focus-within,
    .para-focus-mode .ql-editor p:hover { opacity: 1; }
    .para-focus-mode-active .ql-editor p { opacity: 0.18; transition: opacity .25s; }
    .para-focus-mode-active .ql-editor p.para-focused { opacity: 1; }
    /* ── Typewriter Mode ── */
    [data-editor-scroll].typewriter-mode { scroll-behavior: smooth; }
  `;

  // ─── LOADING SCREEN ───────────────────────────────────────────────────────────
  const enterFocusModeRef = useRef(null);
  const exitFocusModeRef = useRef(null);
  useEffect(() => { enterFocusModeRef.current = enterFocusMode; exitFocusModeRef.current = exitFocusMode; });

  if (screen === "loading") {
    return (
      <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f7f4ef",color:"#3d4a3e",fontFamily:"'Sarabun',sans-serif"}}>
        <div style={{textAlign:"center"}}>
          <div style={{borderRadius:16,background:"#edeae4",display:"inline-flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",padding:"12px 20px",boxShadow:"0 2px 16px #8faa8b22"}}>
            <NFALogo size={48} textColor="#3d4a3e" accentColor="#8faa8b" />
          </div>
          <div style={{fontSize:20,fontWeight:800,letterSpacing:"-.02em",marginBottom:4}}>NFA Studio</div>
          <div style={{fontSize:11,opacity:.5,letterSpacing:".15em",textTransform:"uppercase",marginBottom:16}}>Novel Flow Artist</div>
          <div style={{fontSize:13,opacity:.5}}>กำลังโหลด...</div>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  // ─── HOME / PROJECT MANAGER ───────────────────────────────────────────────────
  if (screen === "home") {
    const activeProject = projects.find(p => p.id === activeProjectId);
    return (
      <div style={{ fontFamily:"'Sarabun',sans-serif", height:"100vh", overflow:"auto", background:theme.bg, color:theme.ink }}>
        <style>{css}</style>
        <input ref={loadInput} type="file" accept=".json,.novelforge" style={{display:"none"}} onChange={handleImportFile} />
        {toast && <div style={{position:"fixed",bottom:60,left:"50%",transform:"translateX(-50%)",background:theme.ink,color:theme.bg,padding:"10px 20px",borderRadius:24,fontSize:13,fontWeight:600,zIndex:9999,boxShadow:"0 4px 20px #0004",whiteSpace:"nowrap"}}>{toast}</div>}

        {/* Crash Recovery Banner */}
        {crashDraft && (
          <div style={{position:"fixed",top:0,left:0,right:0,zIndex:3000,background:"#f59e0b",color:"#1a1612",padding:"10px 24px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 2px 16px #0003"}}>
            <span style={{fontSize:18}}>⚠️</span>
            <div style={{flex:1}}>
              <span style={{fontWeight:700}}>พบ Draft ที่ยังไม่ได้บันทึก</span>
              <span style={{fontSize:12,marginLeft:8,opacity:.75}}>
                {crashDraft.chapters.length} บท · {new Date(crashDraft.savedAt).toLocaleString("th-TH")}
              </span>
            </div>
            <button
              onClick={async () => {
                // หาโปรเจกต์ที่ตรงกัน แล้ว merge chapters กลับ
                const proj = projects.find(p => p.id === crashDraft.projectId);
                if (proj) {
                  const merged = { ...proj, chapters: proj.chapters.map(ch => {
                    const draft = crashDraft.chapters.find(d => d.id === ch.id);
                    return draft && draft.content.length > (ch.content||"").length ? {...ch, content:draft.content} : ch;
                  })};
                  await dbPut("projects", merged);
                  await openProject(merged);
                  showToast("✅ Recover Draft สำเร็จ");
                }
                clearCrashDraft();
                setCrashDraft(null);
              }}
              style={{padding:"6px 16px",background:"#1a1612",color:"#f59e0b",border:"none",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
              🔄 Recover
            </button>
            <button
              onClick={() => { clearCrashDraft(); setCrashDraft(null); }}
              style={{padding:"6px 12px",background:"transparent",color:"#1a1612",border:"1px solid #1a161244",borderRadius:8,fontSize:12,cursor:"pointer",opacity:.7}}>
              ✕ ปิด
            </button>
          </div>
        )}

        {/* Header */}
        <div style={{background:`linear-gradient(135deg,${theme.sidebar},${theme.panel})`,borderBottom:`1px solid ${theme.border}`,padding:"24px 40px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{borderRadius:14,background:"#edeae4",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,padding:"6px 12px",border:"1px solid #c8d4c4"}}>
              <NFALogo size={32} textColor="#3d4a3e" accentColor="#8faa8b" />
            </div>
            <div>
              <div style={{fontSize:22,fontWeight:800,letterSpacing:"-.03em",color:theme.accent}}>NFA Studio</div>
              <div style={{fontSize:10,opacity:.5,letterSpacing:".12em",textTransform:"uppercase"}}>Novel Flow Artist</div>
            </div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {["white","sepia","dark"].map(t=>(
              <button key={t} className={"theme-btn"+(settings.theme===t?" active":"")} onClick={()=>setSetting("theme",t)} style={{fontSize:11}}>
                {t==="white"?"☀":t==="sepia"?"📜":"🌙"}
              </button>
            ))}
          </div>
        </div>

        <div style={{padding:"28px 40px",maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
            <div>
              <div style={{fontSize:20,fontWeight:800}}>📚 My Projects</div>
              <div style={{fontSize:13,opacity:.5,marginTop:2}}>{projects.length} โปรเจกต์ · เก็บใน IndexedDB ของเครื่องคุณ</div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn" onClick={importProject} style={{padding:"8px 16px",fontSize:13}}>📂 Import</button>
              <button className="btn" onClick={()=>{setEditingSeries(null);setShowSeriesModal(true);}} style={{padding:"8px 16px",fontSize:13}}>📚 New Series</button>
              <button className="accent-btn" onClick={()=>setShowTemplatePicker(true)} style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:16}}>+</span> New Project
              </button>
            </div>
          </div>

          {/* ─ Series section ──────────────────────────────────────────────── */}
          {series.length > 0 && (
            <div style={{marginBottom:32}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <div style={{fontSize:14,fontWeight:700,opacity:.7}}>📚 ชุดนิยาย (Series)</div>
                <button className="btn" style={{fontSize:11,padding:"3px 10px"}} onClick={()=>{setEditingSeries(null);setShowSeriesModal(true);}}>+ New Series</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>
                {series.map(s => {
                  const bookProjects = s.bookIds.map(bid => projects.find(p => p.id === bid)).filter(Boolean);
                  const isDragTarget = homeDragOverSeries === s.id;
                  return (
                    <div key={s.id}
                      onDragOver={e=>{ e.preventDefault(); setHomeDragOverSeries(s.id); }}
                      onDragLeave={e=>{ if(!e.currentTarget.contains(e.relatedTarget)) setHomeDragOverSeries(null); }}
                      onDrop={e=>{ e.preventDefault(); setHomeDragOverSeries(null); if(homeDragProject){ addProjectToSeries(homeDragProject,s.id); setHomeDragProject(null); } }}
                      style={{border:`2px solid ${isDragTarget ? s.coverColor : s.coverColor+"44"}`,borderRadius:12,padding:14,background:isDragTarget ? s.coverColor+"11" : theme.panel,position:"relative",transition:"border .15s,background .15s",boxShadow:isDragTarget?`0 0 0 3px ${s.coverColor}44`:undefined}}>
                      <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                        <div style={{width:36,height:36,borderRadius:8,background:s.coverColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>📚</div>
                        <div style={{flex:1,overflow:"hidden"}}>
                          <div style={{fontWeight:700,fontSize:14,color:s.coverColor}}>{s.title}</div>
                          {s.desc && <div style={{fontSize:11,opacity:.55,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.desc}</div>}
                          <div style={{fontSize:10,opacity:.4,marginTop:3}}>{bookProjects.length} เล่ม</div>
                        </div>
                        <div style={{display:"flex",gap:4}} onClick={e=>e.stopPropagation()}>
                          <button className="btn" style={{padding:"2px 6px",fontSize:10}} onClick={()=>{setEditingSeries(s);setShowSeriesModal(true);}}>✏</button>
                          <button className="btn" style={{padding:"2px 6px",fontSize:10,color:"#ef4444",borderColor:"#ef444444"}} onClick={()=>deleteSeries(s.id)}>🗑</button>
                        </div>
                      </div>
                      {bookProjects.length > 0 && (
                        <div style={{marginTop:10,display:"flex",flexWrap:"wrap",gap:6}}>
                          {bookProjects.map((bp,i) => (
                            <button key={bp.id} className="btn" style={{padding:"3px 10px",fontSize:11,borderColor:s.coverColor+"55",color:s.coverColor,fontWeight:600}}
                              onClick={()=>openProject(bp)}>
                              {i+1}. {bp.book?.title||bp.name}
                            </button>
                          ))}
                        </div>
                      )}
                      {/* Drag hint */}
                      {homeDragProject && !bookProjects.find(bp=>bp.id===homeDragProject) && (
                        <div style={{marginTop:8,border:`2px dashed ${s.coverColor}`,borderRadius:8,padding:"6px 12px",fontSize:11,color:s.coverColor,opacity:.7,textAlign:"center",pointerEvents:"none"}}>
                          ➕ วางที่นี่เพื่อเพิ่มเข้าชุดนิยาย
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Projects grid */}
          {projects.length === 0 ? (
            <div style={{textAlign:"center",padding:"80px 0",opacity:.3}}>
              <div style={{fontSize:56,marginBottom:16}}>📖</div>
              <div style={{fontSize:18,fontWeight:700,marginBottom:8}}>ยังไม่มีโปรเจกต์</div>
              <div style={{fontSize:14}}>กด "+ New Project" เพื่อเริ่มต้น</div>
            </div>
          ) : (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16,marginBottom:32}}>
              {projects.map(p => {
                const coverTpl = COVER_TEMPLATES[p.settings?.coverTemplate] || COVER_TEMPLATES.dark;
                const hasCustomCover = !!p.settings?.coverImageData;
                const pSeries = series.find(s => s.id === p.seriesId);
                return (
                  <div key={p.id} className="project-card fade-in"
                    draggable
                    onDragStart={e=>{ e.dataTransfer.effectAllowed="move"; setHomeDragProject(p.id); }}
                    onDragEnd={()=>{ setHomeDragProject(null); setHomeDragOverSeries(null); }}
                    onClick={()=>openProject(p)}
                    style={{opacity: homeDragProject===p.id ? 0.5 : 1, cursor:"grab", transition:"opacity .15s"}}>
                    {/* Mini cover preview */}
                    <div style={{height:100,borderRadius:10,overflow:"hidden",marginBottom:12,position:"relative",...(hasCustomCover?{backgroundImage:`url(${p.settings.coverImageData})`,backgroundSize:"cover",backgroundPosition:"center"}:{background:coverTpl.bg})}}>
                      {hasCustomCover && <div style={{position:"absolute",inset:0,background:`rgba(0,0,0,${(p.settings.coverOverlay||30)/100})`}} />}
                      <div style={{position:"relative",zIndex:1,padding:"10px 12px",display:"flex",flexDirection:"column",justifyContent:"flex-end",height:"100%"}}>
                        <div style={{color:"#fff",fontWeight:700,fontSize:13,textShadow:"0 2px 6px #0006"}}>{p.book?.title||p.name}</div>
                        <div style={{color:"#ffffff88",fontSize:10}}>{p.book?.pen||p.book?.author||"ผู้แต่ง"}</div>
                      </div>
                      {/* Series badge */}
                      {pSeries && (
                        <div style={{position:"absolute",top:6,right:6,background:pSeries.coverColor,color:"#fff",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20,boxShadow:"0 1px 6px #0004"}}>
                          📚 {pSeries.title}
                        </div>
                      )}
                    </div>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8}}>
                      <div style={{flex:1,overflow:"hidden"}}>
                        <div style={{fontWeight:700,fontSize:14,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.book?.title||p.name}</div>
                        <div style={{fontSize:11,opacity:.5,marginTop:2}}>
                          {p.chapters?.length||0} บท · {(p.chapters||[]).reduce((s,c)=>s+wordCount(c.content||""),0).toLocaleString()} คำ
                        </div>
                        <div style={{fontSize:10,opacity:.4,marginTop:2}}>
                          {new Date(p.updatedAt).toLocaleDateString("th-TH",{year:"numeric",month:"short",day:"numeric"})}
                        </div>
                      </div>
                      <div style={{display:"flex",gap:4,flexShrink:0}} onClick={e=>e.stopPropagation()}>
                        <button className="btn" style={{padding:"3px 7px",fontSize:11}} title="Duplicate" onClick={()=>setShowDuplicateProject(p)}>⧉</button>
                        <button className="btn" style={{padding:"3px 7px",fontSize:11,color:"#ef4444",borderColor:"#ef444444"}} title="Delete" onClick={()=>setShowDeleteConfirm(p)}>🗑</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick actions */}
          <div style={{borderTop:`1px solid ${theme.border}`,paddingTop:24}}>
            <div style={{fontSize:11,fontWeight:700,opacity:.45,letterSpacing:".08em",textTransform:"uppercase",marginBottom:12}}>เครื่องมือ</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <button className="btn" onClick={importProject} style={{padding:"8px 14px",fontSize:12}}>📂 Import .novelforge / .json</button>
              <button className="btn" onClick={()=>setSetting("theme", settings.theme==="dark"?"white":"dark")} style={{padding:"8px 14px",fontSize:12}}>
                {settings.theme==="dark"?"☀ Light":"🌙 Dark"} Mode
              </button>
            </div>
          </div>
        </div>

        {/* Template Picker modal */}
        {showTemplatePicker && (
          <TemplatePicker
            theme={theme}
            onClose={()=>setShowTemplatePicker(false)}
            onSelect={(tpl, name, layout, seriesId) => createFromTemplate(tpl, name, layout, seriesId)}
            LAYOUT_SIZES={LAYOUT_SIZES}
            series={series}
            onCreateSeries={createSeries}
          />
        )}

        {/* Duplicate confirm */}
        {showDuplicateProject && (
          <div className="modal-bg" onClick={e=>{ if(e.target===e.currentTarget) setShowDuplicateProject(null); }}>
            <div className="modal-box fade-in">
              <div style={{fontWeight:800,fontSize:17,marginBottom:12}}>⧉ Duplicate โปรเจกต์</div>
              <div style={{fontSize:13,opacity:.7,marginBottom:20}}>
                ต้องการสำเนา <strong>{showDuplicateProject.book?.title||showDuplicateProject.name}</strong> ใช่ไหม?
              </div>
              <div style={{display:"flex",gap:8}}>
                <button className="accent-btn" onClick={()=>duplicateProject(showDuplicateProject)}>⧉ Duplicate</button>
                <button className="btn" onClick={()=>setShowDuplicateProject(null)} style={{padding:"7px 16px",fontSize:13}}>ยกเลิก</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete confirm */}
        {showDeleteConfirm && (
          <div className="modal-bg" onClick={e=>{ if(e.target===e.currentTarget) setShowDeleteConfirm(null); }}>
            <div className="modal-box fade-in">
              <div style={{fontWeight:800,fontSize:17,marginBottom:12,color:"#ef4444"}}>🗑 ลบโปรเจกต์</div>
              <div style={{fontSize:13,opacity:.7,marginBottom:20}}>
                ต้องการลบ <strong>{showDeleteConfirm.book?.title||showDeleteConfirm.name}</strong> ถาวรหรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
              </div>
              <div style={{display:"flex",gap:8}}>
                <button style={{padding:"7px 20px",background:"#ef4444",color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer"}} onClick={()=>deleteProject(showDeleteConfirm.id)}>🗑 ลบถาวร</button>
                <button className="btn" onClick={()=>setShowDeleteConfirm(null)} style={{padding:"7px 16px",fontSize:13}}>ยกเลิก</button>
              </div>
            </div>
          </div>
        )}

        {/* Series Modal — Create / Edit */}
        {showSeriesModal && (
          <SeriesModal
            theme={theme}
            existing={editingSeries}
            projects={projects}
            series={series}
            onClose={()=>setShowSeriesModal(false)}
            onCreate={async (title,desc,color)=>{ const s=await createSeries(title,desc,color); setShowSeriesModal(false); return s; }}
            onUpdate={(id,patch)=>{updateSeries(id,patch);setShowSeriesModal(false);}}
            onAddBook={addProjectToSeries}
            onRemoveBook={removeProjectFromSeries}
          />
        )}
      </div>
    );
  }

  // ─── FOCUS MODE ───────────────────────────────────────────────────────────────
  // ─ Fullscreen Focus Mode ─
  function enterFocusMode() {
    setFocusMode(true);
    try {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
    } catch(e) { /* Intl.Segmenter not available, fallback used */ }
  }
  function exitFocusMode() {
    setFocusMode(false);
    try {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    } catch(e) { /* Intl.Segmenter not available, fallback used */ }
  }


  if (focusMode) {
    const focusBg = settings.theme === "dark" ? "#0a0806" : settings.theme === "sepia" ? "#f0e6d3" : "#e8e4de";
    const focusWords = activeCh ? wordCount(activeCh.content) : 0;
    const pct = Math.min(100, Math.round((focusWords / Math.max(1, writingGoal)) * 100));
    return (
      <div style={{fontFamily:`'${settings.font}',sans-serif`,height:"100vh",background:focusBg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px 24px"}}>
        <style>{css + `
          .focus-toolbar{opacity:0;transition:opacity .3s}
          .focus-toolbar:hover{opacity:1}
        `}</style>

        {/* Top toolbar — hover to show */}
        <div className="focus-toolbar" style={{position:"fixed",top:0,left:0,right:0,padding:"10px 24px",display:"flex",alignItems:"center",gap:12,background:`${theme.panel}ee`,borderBottom:`1px solid ${theme.border}`,zIndex:100,backdropFilter:"blur(8px)"}}>
          <button onClick={exitFocusMode} style={{padding:"5px 14px",border:`1px solid ${theme.border}`,borderRadius:8,background:"transparent",color:theme.ink,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
            ⊡ ออก Fullscreen
          </button>
          <span style={{fontSize:11,opacity:.5}}>ESC หรือ hover ที่ขอบบนเพื่อแสดง toolbar</span>
          <div style={{flex:1}} />
          {/* Chapter nav */}
          <button className="btn" style={{fontSize:11}} onClick={()=>{const idx=chapters.findIndex(c=>c.id===activeChId);if(idx>0)setActiveChId(chapters[idx-1].id);}}>← บทก่อน</button>
          <span style={{fontSize:11,opacity:.6}}>{chapters.findIndex(c=>c.id===activeChId)+1}/{chapters.length}</span>
          <button className="btn" style={{fontSize:11}} onClick={()=>{const idx=chapters.findIndex(c=>c.id===activeChId);if(idx<chapters.length-1)setActiveChId(chapters[idx+1].id);}}>บทถัดไป →</button>
          <select value={settings.font} onChange={e=>setSetting("font",e.target.value)}
            style={{padding:"3px 6px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:6,fontSize:11,color:theme.ink,cursor:"pointer"}}>
            {FONTS.map(f=><option key={f}>{f}</option>)}
          </select>
          <input type="range" min={12} max={72} value={settings.fontSize} onChange={e=>setSetting("fontSize",parseInt(e.target.value))} style={{width:80,accentColor:theme.accent}} title="ขนาดตัวอักษร"/>
        </div>

        {/* Page */}
        {activeCh && (
          <div className="page-for-export" style={{maxWidth:layoutSize.px.w}}>
            {(()=>{
              const hideRule = settings.showChapterLine===false || settings.dividerDecor?.type==="svg" || settings.dividerDecor?.type==="image";
              return (
                <div style={{textAlign:"center",marginBottom:hideRule?6:28,paddingBottom:hideRule?6:14,borderBottom:hideRule?"none":`1px solid ${theme.border}44`}}>
                  <div style={{fontSize:10,letterSpacing:".2em",textTransform:"uppercase",opacity:.35,marginBottom:5}}>บทที่ {chapters.findIndex(c=>c.id===activeChId)+1}</div>
                  <div style={{fontSize:17,fontWeight:700,color:theme.accent,fontFamily:`'${settings.font}',sans-serif`}}>{activeCh.title}</div>
                </div>
              );
            })()}
            <SceneDividerRenderer settings={settings} theme={theme} style={{marginBottom:12}} />
            {/* Behind-text images — ใช้ behindImages (memoized) แทน getImagesForChapter inline */}
            {behindImages.map(img=>(
              <ImageBlock key={img.id} image={img} selected={selectedImageId===img.id} onUpdate={handleUpdateImage} onDelete={handleDeleteImage} onSelect={setSelectedImageId} onOpenProperties={id=>{setSelectedImageId(id);}} theme={theme}/>
            ))}
            {/* Inline/float images before textarea — ใช้ inlineImages (memoized) */}
            {inlineImages.map(img=>(
              <ImageBlock key={img.id} image={img} selected={selectedImageId===img.id} onUpdate={handleUpdateImage} onDelete={handleDeleteImage} onSelect={setSelectedImageId} onOpenProperties={id=>{setSelectedImageId(id);}} theme={theme}/>
            ))}
            {/* 🎙 interim wrapper — focus mode */}
            <div style={{position:"relative"}}>
            <RichEditor
              chId={activeCh.id}
              content={activeCh.content}
              onChange={(id, html) => { updateChapter(id, { content: html }); }}
              className={`editor${settings.dropCap?" drop-cap-first":""}`}
              style={{minHeight:layoutSize.px.h - settings.marginV*2 - 120, lineHeight:`${settings.lineHeight/100}`}}
              placeholder="เริ่มเขียนที่นี่..."
              autoFocus
              theme={theme}
              settings={settings}
              onKeyDown={e => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  document.execCommand("insertText", false, "\u2003");
                }
              }}
            />
            {micInterim && (
              <div aria-hidden="true" style={{
                position:"absolute", top:0, left:0, right:0, bottom:0,
                pointerEvents:"none",
                fontSize: settings.fontSize, lineHeight:`${settings.lineHeight/100}`,
                fontFamily:`'${settings.font}','Noto Serif Thai','Sarabun',sans-serif`,
                padding:0, whiteSpace:"pre-wrap", wordBreak:"break-word",
                color:"transparent",
              }}>
                {stripHtml(activeCh.content)}
                <span style={{color:theme.accent,opacity:.6,fontStyle:"italic"}}>{micInterim}</span>
              </div>
            )}
            </div>{/* end interim wrapper — focus mode */}
          </div>
        )}

        {/* Bottom bar — always visible */}
        <div style={{position:"fixed",bottom:0,left:0,right:0,padding:"8px 24px",display:"flex",alignItems:"center",gap:16,background:`${theme.panel}cc`,borderTop:`1px solid ${theme.border}33`,zIndex:100,backdropFilter:"blur(8px)"}}>
          <div style={{flex:1,height:3,background:`${theme.border}55`,borderRadius:10,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:theme.accent,borderRadius:10,transition:".5s"}} />
          </div>
          <span style={{fontSize:11,opacity:.5,whiteSpace:"nowrap"}}>{focusWords.toLocaleString()} คำ · {pct}% goal</span>
          <span style={{fontSize:11,opacity:.4}}>{book.title}</span>
        </div>

        {toast && <div style={{position:"fixed",bottom:40,left:"50%",transform:"translateX(-50%)",background:theme.ink,color:theme.bg,padding:"10px 20px",borderRadius:24,fontSize:13,fontWeight:600,zIndex:9999}}>{toast}</div>}
      </div>
    );
  }


  // ─── READING MODE ────────────────────────────────────────────────────────────
  if (readingMode && screen === "editor" && activeCh) {
    const readBg    = settings.theme === "dark" ? "#0a0806" : settings.theme === "sepia" ? "#f5edd8" : "#faf8f4";
    const readInk   = settings.theme === "dark" ? "#e8ddd0" : "#2a1e12";
    return (
      <div style={{fontFamily:`'${settings.font}',sans-serif`,height:"100vh",background:readBg,overflowY:"auto",padding:"48px 24px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <style>{css}</style>
        {/* Top bar */}
        <div style={{position:"fixed",top:0,left:0,right:0,padding:"8px 24px",display:"flex",alignItems:"center",gap:12,background:`${readBg}ee`,borderBottom:`1px solid ${readInk}11`,zIndex:100,backdropFilter:"blur(8px)"}}>
          <button onClick={()=>setReadingMode(false)} style={{padding:"4px 12px",border:`1px solid ${readInk}22`,borderRadius:8,background:"transparent",color:readInk,fontSize:11,cursor:"pointer"}}>
            ← ออก Reading Mode
          </button>
          <span style={{fontSize:11,opacity:.4}}>Ctrl+` สลับ · ESC ปิด</span>
          <div style={{flex:1}}/>
          <button className="btn" style={{fontSize:11}} onClick={()=>{const idx=chapters.findIndex(c=>c.id===activeChId);if(idx>0)setActiveChId(chapters[idx-1].id);}}>← บทก่อน</button>
          <span style={{fontSize:11,opacity:.5}}>{chapters.findIndex(c=>c.id===activeChId)+1}/{chapters.length}</span>
          <button className="btn" style={{fontSize:11}} onClick={()=>{const idx=chapters.findIndex(c=>c.id===activeChId);if(idx<chapters.length-1)setActiveChId(chapters[idx+1].id);}}>บทถัดไป →</button>
        </div>

        {/* Reading content */}
        <div style={{maxWidth:layoutSize.px.w,width:"100%",marginTop:56,paddingBottom:64}}>
          {/* Chapter heading */}
          <div style={{textAlign:"center",marginBottom:32,paddingBottom:16,borderBottom:`1px solid ${readInk}18`}}>
            <div style={{fontSize:10,letterSpacing:".25em",textTransform:"uppercase",opacity:.4,marginBottom:6}}>
              บทที่ {chapters.findIndex(c=>c.id===activeChId)+1}
            </div>
            <div style={{fontSize:20,fontWeight:700,color:theme.accent}}>{activeCh.title}</div>
          </div>
          <SceneDividerRenderer settings={settings} theme={theme} style={{marginBottom:20}} />
          {/* Body text — rendered as formatted HTML */}
          <div style={{fontSize:settings.fontSize,lineHeight:`${settings.lineHeight/100}`,color:readInk,fontFamily:`'${settings.font}','Noto Serif Thai','Sarabun',serif`,wordBreak:"break-word",textAlign:settings.textAlign||"left"}}
            dangerouslySetInnerHTML={{__html: activeCh.content}} />
          {/* Footer */}
          <div style={{textAlign:"center",marginTop:32,paddingTop:16,borderTop:`1px solid ${readInk}18`,fontSize:10,opacity:.3}}>
            {book.title} · {wordCount(activeCh.content).toLocaleString()} คำ
          </div>
        </div>
        {toast && <div style={{position:"fixed",bottom:40,left:"50%",transform:"translateX(-50%)",background:readInk,color:readBg,padding:"10px 20px",borderRadius:24,fontSize:13,fontWeight:600,zIndex:9999}}>{toast}</div>}
      </div>
    );
  }

  // ─── EDITOR SCREEN ────────────────────────────────────────────────────────────
  const activeProjectSeriesId = projects.find(p => p.id === activeProjectId)?.seriesId || null;
  const activeSeriesObj = activeProjectSeriesId ? series.find(s => s.id === activeProjectSeriesId) : null;

  const writeTabs = [
    {id:"editor",      icon:"✍️", label:"เขียน"},
    {id:"preview",     icon:"👁",  label:"Preview"},
    {id:"structure",   icon:"☰",  label:"Structure"},
    {id:"dashboard",   icon:"📈", label:"Dashboard"},
    null, // separator
    {id:"characters",  icon:"👤", label:"ตัวละคร"},
    {id:"scene_board", icon:"🎬", label:"Scenes"},
    {id:"timeline",    icon:"⏳", label:"Timeline"},
    {id:"world",       icon:"🌍", label:"World"},
    {id:"worldmap",    icon:"🌐", label:"World Map"},
    {id:"mindmap",     icon:"🗺", label:"Mind Map"},
    null, // separator
    {id:"ai",          icon:"🤖", label:"AI"},
    // Series tab — แสดงเฉพาะเมื่อ book อยู่ใน series
    ...(activeSeriesObj ? [null, {id:"series", icon:"📚", label:"Series"}] : []),
  ];
  const bookTabs = [
    {id:"covers",      icon:"🎨", label:"ปก"},
    {id:"structure",   icon:"☰",  label:"Structure"},
    {id:"assets",      icon:"📁", label:"Assets"},
    null, // separator
    {id:"preview",     icon:"👁",  label:"Preview"},
  ];
  // active tab array based on workMode
  const mainTabs = workMode === "write" ? writeTabs : bookTabs;

  // when switching mode, jump to a sensible default tab
  function switchWorkMode(mode) {
    setWorkMode(mode);
    if (mode === "write" && !writeTabs.filter(Boolean).find(t => t.id === mainTab)) {
      setMainTab("editor");
    }
    if (mode === "book" && !bookTabs.filter(Boolean).find(t => t.id === mainTab)) {
      setMainTab("covers");
    }
  }

  return (
    <div style={{fontFamily:"'Sarabun',sans-serif",height:"100vh",display:"flex",flexDirection:"column",background:theme.bg,color:theme.ink}}>
      <NFAFavicon />
      <style>{css}</style>
      <input ref={loadInput} type="file" accept=".json,.novelforge" style={{display:"none"}} onChange={handleImportFile} />
      <input ref={coverInput} type="file" accept="image/*" style={{display:"none"}} onChange={handleCoverImage} />
      <input ref={backCoverInput} type="file" accept="image/*" style={{display:"none"}} onChange={handleBackCoverImage} />
      <input ref={assetInput} type="file" accept="image/*" multiple style={{display:"none"}} onChange={e=>handleAssetUpload(e,"อื่นๆ")} />

      {toast && <div style={{position:"fixed",bottom:40,left:"50%",transform:"translateX(-50%)",background:theme.ink,color:theme.bg,padding:"10px 20px",borderRadius:24,fontSize:13,fontWeight:600,zIndex:9999,boxShadow:"0 4px 20px #0004",whiteSpace:"nowrap"}}>{toast}</div>}

      {/* Menubar */}
      <div className="menubar" style={{background:theme.panel}}>
        <button className="menu-item" style={{padding:"2px 8px",display:"flex",alignItems:"center"}} onClick={()=>setScreen("home")} title="กลับหน้าแรก">
          <div style={{height:28,borderRadius:8,background:"#f7f4ef",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 6px"}}>
            <NFALogo size={22} textColor="#3d4a3e" accentColor="#8faa8b" />
          </div>
        </button>
        <MenuDropdown label="ไฟล์" theme={theme} items={[
          {label:"💾 Export .novelforge", fn:exportProject},
          {label:"💾 Save As…",           fn:()=>setShowSaveAs(true)},
          {label:"─────────────────",    fn:null},
          {label:"📂 Import Project",     fn:importProject},
          {label:"📝 Import DOCX",         fn:()=>docxInput.current?.click()},
          {label:"📄 Import Markdown",     fn:()=>mdInput.current?.click()},
          {label:"📖 Import EPUB",         fn:()=>epubInput.current?.click()},
          {label:"─────────────────",    fn:null},
          {label:"📄 Export PDF",          fn:exportPDF},
          {label:"📖 Export EPUB",          fn:exportEPUB},
          {label:"🏠 กลับหน้าแรก",        fn:()=>setScreen("home")},
        ]}/>
        <MenuDropdown label="มุมมอง" theme={theme} items={[
          {label:leftOpen?"← ซ่อน Sidebar":"→ แสดง Sidebar",   fn:()=>setLeftOpen(v=>!v)},
          {label:rightOpen?"→ ซ่อน Panel":"← แสดง Panel",        fn:()=>setRightOpen(v=>!v)},
          {label:"⊡ Focus Mode  (Ctrl+Enter)", fn:enterFocusMode},
          {label:`📖 Reading Mode  (Ctrl+\`)${readingMode?" ✓":""}`, fn:()=>setReadingMode(v=>!v)},
          {label:"─────────────────", fn:null},
          {label:showViewBar?"👁 ซ่อน View Mode Bar":"👁 แสดง View Mode Bar", fn:()=>setShowViewBar(v=>!v)},
          {label:"✏️ โหมดเขียน",    fn:()=>setViewMode("write")},
          {label:"📖 โหมดหนังสือ",  fn:()=>setViewMode("book")},
          {label:"📱 โหมด Kindle",  fn:()=>setViewMode("kindle")},
          {label:"🖨️ โหมดพิมพ์",   fn:()=>setViewMode("print")},
          {label:"📲 โหมดมือถือ",  fn:()=>setViewMode("mobile")},
          {label:"─────────────────", fn:null},
          {label:splitChId?"⊟ ปิด Split View":"⊞ Split View (2 บทพร้อมกัน)", fn:()=>{
            if(splitChId){ setSplitChId(null); }
            else {
              const other = chapters.find(c=>c.id!==activeChId);
              if(other) setSplitChId(other.id);
              else showToast("ต้องมีอย่างน้อย 2 บทเพื่อใช้ Split View");
            }
          }},
        ].filter(Boolean)}/>
        <MenuDropdown label="แก้ไข" theme={theme} items={[
          {label:"🔍 Find  (Ctrl+F)",           fn:()=>{ setFrBarVisible(true); setFrReplace(""); setTimeout(()=>frQueryRef.current?.focus(),50); }},
          {label:"🔁 Find & Replace  (Ctrl+H)", fn:()=>{ setFrBarVisible(true); setTimeout(()=>frQueryRef.current?.focus(),50); }},
        ]}/>
        <MenuDropdown label="แทรก" theme={theme} items={[
          {label:"🖼 แทรกรูปภาพ", fn:handleInsertImage},
          {label:"─────────", fn:null},
          {label:"📄 หน้าว่าง", fn:()=>insertTriggerRef.current?.("blank")},
          {label:"🗒️ กล่องข้อความ", fn:()=>insertTriggerRef.current?.("textbox")},
          {label:"✦ Section Break", fn:()=>insertTriggerRef.current?.("section")},
          {label:"📖 Chapter Title", fn:()=>insertTriggerRef.current?.("chapter")},
          {label:"🖼️ หน้ารูปภาพ", fn:()=>insertTriggerRef.current?.("image")},
        ]}/>

        {/* ── Mode Toggle (center) ── */}
        <div style={{flex:1,display:"flex",justifyContent:"center"}}>
          <div style={{display:"flex",gap:2,padding:3,borderRadius:9,background:theme.sidebar,border:`1px solid ${theme.border}`}}>
            <button
              onClick={()=>switchWorkMode("write")}
              style={{
                background: workMode==="write" ? theme.accent+"22" : "none",
                border:"none", borderRadius:6, cursor:"pointer",
                fontFamily:"'Sarabun',sans-serif", fontSize:12, fontWeight:700,
                padding:"5px 18px", display:"flex", alignItems:"center", gap:5,
                color: workMode==="write" ? theme.accent : theme.ink,
                opacity: workMode==="write" ? 1 : .5,
                transition:".15s", whiteSpace:"nowrap",
                boxShadow: workMode==="write" ? `0 0 0 1.5px ${theme.accent}44` : "none",
              }}>
              ✍️ Writing
            </button>
            <button
              onClick={()=>switchWorkMode("book")}
              style={{
                background: workMode==="book" ? theme.accent+"22" : "none",
                border:"none", borderRadius:6, cursor:"pointer",
                fontFamily:"'Sarabun',sans-serif", fontSize:12, fontWeight:700,
                padding:"5px 18px", display:"flex", alignItems:"center", gap:5,
                color: workMode==="book" ? theme.accent : theme.ink,
                opacity: workMode==="book" ? 1 : .5,
                transition:".15s", whiteSpace:"nowrap",
                boxShadow: workMode==="book" ? `0 0 0 1.5px ${theme.accent}44` : "none",
              }}>
              📖 Book Design
            </button>
          </div>
        </div>

        <button className="menu-item" style={{color:theme.accent,fontWeight:600}} onClick={exportProject}>💾</button>
        <div style={{marginRight:8,fontSize:11,opacity:.5}}>
          {autosaveStatus==="saving"&&"💫 บันทึก..."}
          {autosaveStatus==="saved"&&"✓ บันทึกแล้ว"}
          {autosaveStatus==="error"&&"⚠️"}
        </div>
      </div>

      {/* ── Tab bar (below menubar) ── */}
      <div style={{
        display:"flex", alignItems:"center", gap:1,
        padding:"4px 8px",
        background:theme.panel,
        borderBottom:`1px solid ${theme.border}`,
        overflowX:"auto", scrollbarWidth:"none",
      }}>
        {mainTabs.map((t,i) =>
          t === null
            ? <div key={"sep"+i} style={{width:1,height:14,background:theme.border,margin:"0 4px",opacity:.5,flexShrink:0}} />
            : <button key={t.id}
                onClick={()=>setMainTab(t.id)}
                style={{
                  background: mainTab===t.id ? `${theme.accent}18` : "none",
                  border:"none", borderRadius:6, cursor:"pointer",
                  fontFamily:"'Sarabun',sans-serif", fontSize:11.5,
                  fontWeight: mainTab===t.id ? 700 : 500,
                  padding:"5px 10px", whiteSpace:"nowrap",
                  display:"flex", alignItems:"center", gap:4,
                  color: mainTab===t.id ? theme.accent : theme.ink,
                  opacity: mainTab===t.id ? 1 : .55,
                  transition:".1s", flexShrink:0,
                  boxShadow: mainTab===t.id ? `0 0 0 1px ${theme.accent}33` : "none",
                }}>
                {t.icon} {t.label}
              </button>
        )}
      </div>

      {/* Main content */}
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>

        {/* ─── EDITOR TAB ─── */}
        {mainTab === "editor" && (
          <>
            {leftOpen && (
              <div style={{width:52,background:theme.sidebar,borderRight:`1px solid ${theme.border}`,display:"flex",flexDirection:"column",padding:"8px 4px",gap:2,flexShrink:0,overflowY:"auto"}}>
                {[
                  {id:"bookinfo",   icon:"📚", label:"หนังสือ"},
                  {id:"chapters",   icon:"📑", label:"บท"},
                  {id:"toc",        icon:"📋", label:"สารบัญ"},
                  {id:"image",      icon:"🖼",  label:"รูปภาพ"},
                  {id:"typography", icon:"Aa", label:"ฟอนต์"},
                  {id:"layout",     icon:"⊞",  label:"Layout"},
                  {id:"divider",    icon:"🎨",   label:"Divider"},
                  {id:"theme",      icon:"◑",  label:"Theme"},
                  {id:"backup",     icon:"🗄", label:"Backup"},
                  {id:"stats",      icon:"📊", label:"Stats"},
                ].map(item => (
                  <button key={item.id} className={"snav-btn"+(sidebarTab===item.id&&rightOpen?" active":"")}
                    onClick={()=>{ setSidebarTab(item.id); setRightOpen(true); }}>
                    <span className="snav-icon">{item.icon}</span>{item.label}
                  </button>
                ))}
                <div style={{flex:1}} />
                {/* 🎨 Quick Style toggle */}
                <button className={"snav-btn"+(showQuickStyle?" active":"")}
                  onClick={()=>setShowQuickStyle(v=>!v)}
                  title="Quick Style Panel — แก้สี ขนาด ตำแหน่ง ลอยขวามือ">
                  <span className="snav-icon">🎨</span>Quick
                </button>
                {/* 🎙 Mic Button in tool panel */}
                <MicToolPanelBtn theme={theme} activeCh={activeCh} updateChapter={updateChapter} setMicInterim={setMicInterim} />
                <button className="snav-btn" onClick={()=>setLeftOpen(false)}>◁</button>
              </div>
            )}
            {!leftOpen && (
              <button onClick={()=>setLeftOpen(true)} style={{position:"absolute",left:0,top:"50%",transform:"translateY(-50%)",zIndex:10,background:theme.accent,color:"#fff",border:"none",borderRadius:"0 8px 8px 0",padding:"8px 4px",cursor:"pointer",fontSize:12}}>▷</button>
            )}

            {/* Chapter list */}
            {leftOpen && (
              <div style={{width:chListOpen?200:36,background:theme.panel,borderRight:`1px solid ${theme.border}`,display:"flex",flexDirection:"column",flexShrink:0,transition:"width .2s"}}>
                <div style={{padding:"10px 8px 6px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:4}}>
                  {chListOpen && <span style={{fontSize:11,fontWeight:700,opacity:.5,textTransform:"uppercase",letterSpacing:".06em"}}>บท</span>}
                  <div style={{display:"flex",gap:4,marginLeft:"auto"}}>
                    {chListOpen && <button className="btn" onClick={addChapter} style={{padding:"2px 8px",fontSize:12}}>+</button>}
                    <button className="btn" onClick={()=>setChListOpen(o=>!o)}
                      style={{padding:"2px 6px",fontSize:11,opacity:.6}}
                      title={chListOpen?"ซ่อนรายการบท":"แสดงรายการบท"}>
                      {chListOpen?"◁":"▷"}
                    </button>
                  </div>
                </div>
                {chListOpen && (
                  <>
                    <div style={{flex:1,overflowY:"auto",padding:"0 6px 8px"}}>
                      {chapters.map((ch,i) => (
                        <div key={ch.id} draggable
                          onDragStart={()=>setDragItem(ch.id)}
                          onDragOver={e=>{e.preventDefault();setDragOver(ch.id);}}
                          onDrop={()=>{
                            if(!dragItem||dragItem===ch.id) return;
                            const from=chapters.findIndex(c=>c.id===dragItem);
                            const to=chapters.findIndex(c=>c.id===ch.id);
                            const arr=[...chapters]; const [m]=arr.splice(from,1); arr.splice(to,0,m);
                            setChapters(arr); setDragItem(null); setDragOver(null);
                          }}
                          onDragEnd={()=>{setDragItem(null);setDragOver(null);}}
                          className={"ch-item"+(ch.id===activeChId?" active":"")}
                          style={{outline:dragOver===ch.id?`2px dashed ${theme.accent}`:undefined}}
                          onClick={()=>setActiveChId(ch.id)}>
                          <span style={{opacity:.35,fontSize:11,cursor:"grab"}}>⠿</span>
                          <div style={{flex:1,overflow:"hidden"}}>
                            {editingChId===ch.id ? (
                              <input autoFocus value={editingChTitle} onChange={e=>setEditingChTitle(e.target.value)}
                                onBlur={()=>{updateChapter(ch.id,{title:editingChTitle||`บทที่ ${i+1}`});setEditingChId(null);}}
                                onKeyDown={e=>{if(e.key==="Enter"||e.key==="Escape")e.target.blur();}}
                                style={{width:"100%",background:"transparent",border:"none",outline:"none",fontSize:13,color:theme.ink,borderBottom:`1px solid ${theme.accent}`}} />
                            ) : (
                              <span style={{fontSize:12,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block"}}
                                onDoubleClick={()=>{setEditingChId(ch.id);setEditingChTitle(ch.title);}}>
                                {ch.title||`บทที่ ${i+1}`}
                              </span>
                            )}
                            <span style={{fontSize:10,opacity:.45}}>{wordCount(ch.content).toLocaleString()} คำ</span>
                          </div>
                          <div style={{display:"flex",gap:1}}>
                            <button className="btn" style={{padding:"2px 5px",fontSize:10}} onClick={e=>{e.stopPropagation();setEditingChId(ch.id);setEditingChTitle(ch.title);}}>✏</button>
                            <button className="btn" style={{padding:"2px 5px",fontSize:10}} onClick={e=>{e.stopPropagation();moveChapter(ch.id,-1);}}>↑</button>
                            <button className="btn" style={{padding:"2px 5px",fontSize:10}} onClick={e=>{e.stopPropagation();moveChapter(ch.id,1);}}>↓</button>
                            <button className="btn"
                              title={ttsChId===ch.id&&ttsPlaying ? (ttsPaused?"▶ เล่นต่อ":"⏸ หยุดชั่วคราว") : "🔊 อ่านออกเสียง"}
                              style={{padding:"2px 5px",fontSize:10,color:ttsChId===ch.id&&ttsPlaying?theme.accent:undefined}}
                              onClick={e=>{
                                e.stopPropagation();
                                if (ttsChId===ch.id && ttsPlaying) ttsPause();
                                else { ttsStop(); ttsSpeak(ch.id); }
                              }}>
                              {ttsChId===ch.id&&ttsPlaying ? (ttsPaused?"▶":"⏸") : "🔊"}
                            </button>
                            <button className="btn" style={{padding:"2px 5px",fontSize:10,color:"#dc2626"}} onClick={e=>{e.stopPropagation();deleteChapter(ch.id);}}>×</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* TTS Voice Panel */}
                    {ttsShowPanel && (
                      <div style={{padding:"10px 12px",borderTop:`1px solid ${theme.border}`,background:theme.panel,fontSize:11}}>
                        <div style={{fontWeight:700,marginBottom:8,opacity:.75,fontSize:12}}>🔊 ตั้งค่าเสียงอ่าน</div>

                        {/* Highlight ประโยคที่กำลังอ่าน */}
                        {ttsPlaying && ttsHighlight && (
                          <div style={{
                            padding:"6px 8px",marginBottom:8,
                            background:`${theme.accent}18`,
                            border:`1px solid ${theme.accent}44`,
                            borderRadius:7,fontSize:11,lineHeight:1.5,
                            color:theme.ink,opacity:.85,
                            maxHeight:60,overflow:"hidden",
                          }}>
                            <span style={{fontSize:9,opacity:.5,display:"block",marginBottom:2}}>กำลังอ่าน:</span>
                            {ttsHighlight.length > 80 ? ttsHighlight.slice(0,80)+"…" : ttsHighlight}
                          </div>
                        )}

                        {/* Playback controls */}
                        {ttsPlaying && (
                          <div style={{display:"flex",gap:4,marginBottom:8,justifyContent:"center"}}>
                            {/* ย้อนบทก่อนหน้า */}
                            <button className="btn" style={{padding:"3px 8px",fontSize:11}}
                              title="บทก่อนหน้า"
                              onClick={()=>{
                                const idx = chapters.findIndex(c=>c.id===ttsChId);
                                if(idx>0){ttsStop();setTimeout(()=>ttsSpeak(chapters[idx-1].id),100);}
                              }}>⏮</button>
                            {/* Pause/Resume */}
                            <button
                              onClick={ttsPause}
                              style={{padding:"3px 14px",background:theme.accent,color:"#fff",border:"none",borderRadius:6,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                              {ttsPaused ? "▶ เล่นต่อ" : "⏸ หยุด"}
                            </button>
                            {/* หยุด */}
                            <button className="btn" style={{padding:"3px 8px",fontSize:11}}
                              onClick={ttsStop} title="หยุดอ่าน">⏹</button>
                            {/* บทถัดไป */}
                            <button className="btn" style={{padding:"3px 8px",fontSize:11}}
                              title="บทถัดไป"
                              onClick={()=>{
                                const idx = chapters.findIndex(c=>c.id===ttsChId);
                                if(idx<chapters.length-1){ttsStop();setTimeout(()=>ttsSpeak(chapters[idx+1].id),100);}
                              }}>⏭</button>
                          </div>
                        )}

                        {/* Voice picker */}
                        <div style={{marginBottom:7}}>
                          <div style={{opacity:.55,fontSize:10,marginBottom:3}}>เสียง</div>
                          <select value={ttsVoiceName} onChange={e=>setTtsVoiceName(e.target.value)}
                            style={{width:"100%",padding:"4px 6px",background:theme.bg,border:`1px solid ${theme.border}`,borderRadius:6,color:theme.ink,fontSize:11}}>
                            <option value="">🤖 Auto (ตามภาษา)</option>
                            {ttsVoices.length === 0 && <option disabled>— โหลดเสียง... —</option>}
                            {ttsVoices.filter(v=>v.lang.startsWith("th")||v.lang.startsWith("en")).map(v=>(
                              <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                            ))}
                            {ttsVoices.filter(v=>!v.lang.startsWith("th")&&!v.lang.startsWith("en")).length > 0 && (
                              <>
                                <option disabled>── ภาษาอื่น ──</option>
                                {ttsVoices.filter(v=>!v.lang.startsWith("th")&&!v.lang.startsWith("en")).map(v=>(
                                  <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                                ))}
                              </>
                            )}
                          </select>
                        </div>

                        {/* Speed slider */}
                        <div style={{marginBottom:4}}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                            <span style={{opacity:.55,fontSize:10}}>ความเร็ว</span>
                            <span style={{fontSize:10,fontWeight:700,color:theme.accent}}>{ttsRate.toFixed(1)}×</span>
                          </div>
                          <input type="range" min={0.5} max={2} step={0.1} value={ttsRate}
                            onChange={e=>setTtsRate(parseFloat(e.target.value))}
                            style={{width:"100%",accentColor:theme.accent}} />
                          <div style={{display:"flex",justifyContent:"space-between",fontSize:9,opacity:.35,marginTop:1}}>
                            <span>0.5×</span><span>1.0×</span><span>1.5×</span><span>2.0×</span>
                          </div>
                        </div>

                        {/* ไม่มีเสียงไทย warning */}
                        {ttsVoices.length > 0 && !ttsVoices.some(v=>v.lang.startsWith("th")) && (
                          <div style={{fontSize:10,opacity:.5,marginTop:6,padding:"5px 8px",background:`${theme.border}33`,borderRadius:6,lineHeight:1.4}}>
                            ⚠️ ไม่พบเสียงภาษาไทยใน OS นี้<br/>
                            แนะนำ: ติดตั้ง Thai TTS ใน System Settings
                          </div>
                        )}
                      </div>
                    )}
                    <div style={{padding:"4px 10px",borderTop:`1px solid ${theme.border}`,fontSize:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span style={{opacity:.5}}>{chapters.length} บท · {totalWords.toLocaleString()} คำ</span>
                      <button className="btn" title="ตั้งค่าเสียงอ่าน"
                        style={{padding:"1px 6px",fontSize:10,color:ttsShowPanel?theme.accent:undefined}}
                        onClick={()=>setTtsShowPanel(v=>!v)}>
                        🔊 {ttsShowPanel?"▲":"▼"}
                      </button>
                    </div>
                  </>
                )}
                {!chListOpen && (
                  <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6,paddingTop:8,overflowY:"auto"}}>
                    {chapters.map((ch,i) => (
                      <button key={ch.id} onClick={()=>{setActiveChId(ch.id);setChListOpen(true);}}
                        title={ch.title||`บทที่ ${i+1}`}
                        style={{width:24,height:24,borderRadius:6,border:`1px solid ${ch.id===activeChId?theme.accent:theme.border}`,background:ch.id===activeChId?theme.accentLight:"transparent",fontSize:9,color:ch.id===activeChId?theme.accent:theme.ink,cursor:"pointer",fontWeight:700,opacity:.8}}>
                        {i+1}
                      </button>
                    ))}
                    <button className="btn" onClick={addChapter} style={{width:24,height:24,padding:0,fontSize:14,marginTop:4}}>+</button>
                  </div>
                )}
              </div>
            )}

            {/* Editor canvas */}
            <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",background:settings.theme==="dark"?"#0e0c0a":"#d8d4ce"}}>
              {/* Toolbar */}
              <div style={{display:"flex",alignItems:"center",gap:4,padding:"4px 12px",background:theme.panel,borderBottom:`1px solid ${theme.border}`,fontSize:11,flexShrink:0,flexWrap:"wrap"}}>
                {/* Zoom */}
                <button className="btn" onClick={()=>setSetting("zoom",Math.max(50,settings.zoom-10))}>−</button>
                <span style={{opacity:.65,width:40,textAlign:"center"}}>{settings.zoom}%</span>
                <button className="btn" onClick={()=>setSetting("zoom",Math.min(200,settings.zoom+10))}>+</button>
                <button className="btn" onClick={()=>setSetting("zoom",100)}>⊡</button>
                <div style={{width:1,height:16,background:theme.border,opacity:.5,margin:"0 2px"}} />
                <button className="btn" onClick={()=>setSetting("showRuler",!settings.showRuler)}
                  title="แสดง/ซ่อน Ruler"
                  style={{opacity:settings.showRuler?1:.4,fontSize:13}}>📐</button>

                <div style={{width:1,height:16,background:theme.border,opacity:.5,margin:"0 2px"}} />

                {/* Heading */}
                {[["H1","h1"],["H2","h2"],["¶","p"]].map(([label,tag])=>(
                  <button key={tag} className="btn" title={tag==="p"?"Paragraph":`Heading ${tag[1]}`}
                    style={{fontWeight:tag!=="p"?800:400,fontSize:tag==="h1"?13:12}}
                    onClick={()=>qFmt(tag)}>{label}</button>
                ))}

                <div style={{width:1,height:16,background:theme.border,opacity:.5,margin:"0 2px"}} />

                {/* Bold / Italic / Underline / Strike */}
                <button className="btn" title="Bold (Ctrl+B)" onClick={()=>qFmt("bold")}><b style={{fontSize:13}}>B</b></button>
                <button className="btn" title="Italic (Ctrl+I)" onClick={()=>qFmt("italic")}><i style={{fontSize:13}}>I</i></button>
                <button className="btn" title="Underline (Ctrl+U)" onClick={()=>qFmt("underline")}><u style={{fontSize:13}}>U</u></button>
                <button className="btn" title="Strikethrough" onClick={()=>qFmt("strikeThrough")}><s style={{fontSize:13}}>S</s></button>

                <div style={{width:1,height:16,background:theme.border,opacity:.5,margin:"0 2px"}} />

                {/* Text color */}
                <label title="สีตัวอักษร" style={{cursor:"pointer",display:"flex",alignItems:"center",gap:2}}>
                  <span style={{fontWeight:700,fontSize:13,borderBottom:`3px solid ${theme.accent}`}}>A</span>
                  <input type="color" defaultValue="#000000"
                    onChange={e=>qFmt("foreColor",e.target.value)}
                    style={{width:14,height:14,padding:0,border:"none",borderRadius:2,cursor:"pointer",opacity:.7}} />
                </label>

                {/* Highlight */}
                <label title="Highlight" style={{cursor:"pointer",display:"flex",alignItems:"center",gap:2}}>
                  <span style={{background:"#fef08a",padding:"0 3px",borderRadius:2,fontWeight:700,fontSize:12,color:"#000"}}>H</span>
                  <input type="color" defaultValue="#fef08a"
                    onChange={e=>qFmt("hiliteColor",e.target.value)}
                    style={{width:14,height:14,padding:0,border:"none",borderRadius:2,cursor:"pointer",opacity:.7}} />
                </label>

                <div style={{width:1,height:16,background:theme.border,opacity:.5,margin:"0 2px"}} />

                {/* Align */}
                {[["justifyLeft","ชิดซ้าย"],["justifyCenter","กึ่งกลาง"],["justifyRight","ชิดขวา"],["justifyFull","เต็มบรรทัด"]].map(([cmd,title],i)=>(
                  <button key={cmd} className="btn" title={title}
                    onClick={()=>qFmt(cmd)}>{["⬅","↔","➡","⇔"][i]}</button>
                ))}

                <div style={{width:1,height:16,background:theme.border,opacity:.5,margin:"0 2px"}} />

                {/* List + Indent */}
                <button className="btn" title="Bullet List" onClick={()=>qFmt("insertUnorderedList")}>•≡</button>
                <button className="btn" title="Numbered List" onClick={()=>qFmt("insertOrderedList")}>1≡</button>
                <button className="btn" title="Indent" onClick={()=>qFmt("indent")}>→|</button>
                <button className="btn" title="Outdent" onClick={()=>qFmt("outdent")}>|←</button>

                <div style={{width:1,height:16,background:theme.border,opacity:.5,margin:"0 2px"}} />
                <button className="btn" title="ล้างการจัดรูปแบบ" onClick={()=>qFmt("removeFormat")} style={{fontSize:12}}>✕</button>

                <div style={{flex:1}} />

                {/* ── V31: Typewriter + Para Focus ── */}
                <button
                  title={typewriterMode ? "ปิด Typewriter Mode" : "Typewriter Mode — scroll บรรทัดพิมพ์กลางจอ"}
                  onClick={() => setTypewriterMode(v => !v)}
                  style={{
                    padding:"2px 8px", borderRadius:8, border:`1px solid ${typewriterMode?theme.accent:theme.border}`,
                    background: typewriterMode ? theme.accent+"22" : "transparent",
                    color: typewriterMode ? theme.accent : theme.ink,
                    fontSize:11, fontWeight: typewriterMode?700:400,
                    cursor:"pointer", transition:".15s",
                  }}>
                  ⌨ TW
                </button>
                <button
                  title={paraFocusMode ? "ปิด Paragraph Focus" : "Paragraph Focus — dim ย่อหน้าอื่น"}
                  onClick={() => setParaFocusMode(v => !v)}
                  style={{
                    padding:"2px 8px", borderRadius:8, border:`1px solid ${paraFocusMode?theme.accent:theme.border}`,
                    background: paraFocusMode ? theme.accent+"22" : "transparent",
                    color: paraFocusMode ? theme.accent : theme.ink,
                    fontSize:11, fontWeight: paraFocusMode?700:400,
                    cursor:"pointer", transition:".15s",
                  }}>
                  ¶ Focus
                </button>

                {splitChId && (
                  <span style={{fontSize:10,padding:"2px 8px",borderRadius:8,background:theme.accent+"33",color:theme.accent,fontWeight:600}}>⊞ Split View</span>
                )}
                <span style={{opacity:.55}}>{layoutSize.label} · {layoutSize.w}×{layoutSize.h}mm</span>
                <span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:theme.accent,color:"#fff",fontWeight:600,opacity:.85}}>
                  {viewMode==="write"?"✏️ เขียน":viewMode==="book"?"📖 หนังสือ":viewMode==="kindle"?"📱 Kindle":viewMode==="print"?"🖨️ พิมพ์":"📲 มือถือ"}
                </span>
              </div>

              {/* ── Inline Find & Replace bar (Ctrl+F / Ctrl+H) ── */}
              {frBarVisible && (
                <div style={{
                  display:"flex",alignItems:"center",gap:8,padding:"6px 14px",
                  background:theme.panel,borderBottom:`1px solid ${theme.accent}55`,
                  flexShrink:0,flexWrap:"wrap",
                }}>
                  {/* Search input */}
                  <span style={{fontSize:12,opacity:.55,whiteSpace:"nowrap"}}>🔍</span>
                  <input
                    ref={frQueryRef}
                    value={frQuery}
                    onChange={e=>{ setFrQuery(e.target.value); setFrCount(null); }}
                    onKeyDown={e=>{ if(e.key==="Enter"){ e.preventDefault(); doSearchCount(); } if(e.key==="Escape"){ setFrBarVisible(false); setFrCount(null); } }}
                    placeholder="ค้นหา..."
                    style={{width:160,padding:"4px 8px",border:`1px solid ${theme.border}`,borderRadius:6,background:theme.bg,color:theme.ink,fontSize:12,outline:"none"}}
                  />
                  {/* Replace input */}
                  <input
                    value={frReplace}
                    onChange={e=>setFrReplace(e.target.value)}
                    onKeyDown={e=>{ if(e.key==="Enter"){ e.preventDefault(); doReplaceAll(); } if(e.key==="Escape"){ setFrBarVisible(false); setFrCount(null); } }}
                    placeholder="แทนที่ด้วย..."
                    style={{width:150,padding:"4px 8px",border:`1px solid ${theme.border}`,borderRadius:6,background:theme.bg,color:theme.ink,fontSize:12,outline:"none"}}
                  />
                  {/* Count badge */}
                  {frCount !== null && (
                    <span style={{fontSize:11,padding:"2px 8px",borderRadius:10,background:frCount>0?`${theme.accent}22`:`${theme.border}44`,color:frCount>0?theme.accent:theme.ink,fontWeight:600,whiteSpace:"nowrap"}}>
                      {frCount>0?`${frCount} รายการ`:"ไม่พบ"}
                    </span>
                  )}
                  <button className="btn" style={{fontSize:11,padding:"3px 10px"}} onClick={doSearchCount}>นับ</button>
                  <button className="btn" style={{fontSize:11,padding:"3px 10px",background:theme.accent,color:"#fff",border:"none"}} onClick={doReplaceAll}>แทนที่ทั้งหมด</button>
                  <div style={{flex:1}} />
                  <span style={{fontSize:10,opacity:.4}}>Ctrl+F / Ctrl+H · ESC ปิด</span>
                  <button className="btn" style={{padding:"2px 7px",fontSize:12}} onClick={()=>{ setFrBarVisible(false); setFrCount(null); }}>×</button>
                </div>
              )}

              {/* ── Ruler (below zoom toolbar, above panes) ── */}
              {settings.showRuler && (viewMode==="write" || viewMode==="book") && (
                <div style={{flexShrink:0,background:theme.bg,borderBottom:`1px solid ${theme.border}`,overflowX:"auto"}}>
                  <Ruler
                    width={layoutSize.px.w*(settings.zoom/100)}
                    marginH={(settings.marginH||52)*(settings.zoom/100)}
                    firstLineIndent={settings.paragraphFormat?.firstLineIndent||0}
                    fontSize={(settings.fontSize||16)*(settings.zoom/100)}
                    zoom={settings.zoom/100}
                    theme={theme}
                    onMarginChange={v=>setSetting("marginH", Math.round(v/(settings.zoom/100)))}
                    onIndentChange={v=>setParagraphFormat({firstLineIndent:v})}
                  />
                </div>
              )}

              {/* Panes container */}
              <div style={{flex:1,display:"flex",overflow:"hidden"}}>

                {/* ── Main pane ── always rendered, stable key */}
                {(()=>{
                  const ch = activeCh; const chId = activeChId; const isSplit = false;
                  const chImages = getImagesForChapter(images, chId);
                  const behindImgs  = chImages.filter(img=>img.wrapMode==="behind_text"||img.wrapMode==="in_front");
                  const inlineImgs  = chImages.filter(img=>["inline","square","tight"].includes(img.wrapMode));
                  return (
                  <div key="main" style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
                    {/* Ruler moved above panes container */}
                    {splitChId && (
                      <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px",background:theme.panel,borderBottom:`1px solid ${theme.border}`,fontSize:11,flexShrink:0}}>
                        <span style={{opacity:.5,flex:1}}>{activeCh?.title||"—"}</span>
                        <span style={{fontSize:10,opacity:.4}}>บทหลัก</span>
                      </div>
                    )}
                    <div ref={editorScrollRef}
                      data-editor-scroll="1"
                      onMouseDown={e=>{
                        // ปิด panel เฉพาะเมื่อคลิกตรงๆ บน scroll bg (ไม่ใช่ใน editor/page)
                        if (e.target === editorScrollRef.current) {
                          setRightOpen(false);
                          setChListOpen(false);
                        }
                        // ❌ ลบ scrollTop=0 ออก — ทำให้ cursor กระโดดขึ้น top ทุกครั้งที่คลิก
                      }}
                      style={{flex:1,overflow:"auto",padding:viewMode==="mobile"?"16px 8px":"32px 24px",display:"flex",flexDirection:"column",alignItems:"center",position:"relative",background:viewMode==="kindle"?"#f3ece0":viewMode==="print"?"#fff":undefined}}
                      className={typewriterMode?"typewriter-mode":""}
                      onClick={e=>{ if(!e.target.closest("[data-image-id]")&&selectedImageId) setSelectedImageId(null); }}>
                      {viewMode==="mobile" && <div style={{position:"absolute",pointerEvents:"none",zIndex:5,width:336,maxHeight:"90%",top:"50%",left:"50%",transform:"translate(-50%,-50%)",border:"6px solid #333",borderRadius:32,boxShadow:"0 0 0 2px #555, 0 8px 32px #0006"}} />}
                      <div style={{
                        width: viewMode==="mobile" ? 320 : layoutSize.px.w*(settings.zoom/100),
                        minWidth: viewMode==="mobile" ? 320 : layoutSize.px.w*(settings.zoom/100),
                        transform:`scale(${settings.zoom/100})`,
                        transformOrigin:"top center",
                        transition:".15s",
                        flexShrink:0,
                        ...(viewMode==="kindle"?{maxWidth:480*(settings.zoom/100),filter:"sepia(0.15)"}:{}),
                        ...(viewMode==="print"?{boxShadow:"0 2px 16px #0002",outline:"1px solid #ccc"}:{}),
                        ...(viewMode==="mobile"?{position:"relative",zIndex:6}:{}),
                      }}>
                        {/* TOC แสดงเฉพาะใน Preview/Export ไม่แสดงขณะเขียน */}
                        {ch && (
                          <PaginatedEditor
                            chId={ch.id}
                            content={ch.content}
                            onChange={(id, html) => updateChapter(id, { content: html })}
                            theme={theme}
                            settings={settings}
                            layoutSize={layoutSize}
                            typewriterMode={typewriterMode}
                            paraFocusMode={paraFocusMode}
                            editorScrollRef={editorScrollRef}
                            insertTriggerRef={insertTriggerRef}
                            headerEl={(()=>{
                              const hideRule=settings.showChapterLine===false||settings.dividerDecor?.type==="svg"||settings.dividerDecor?.type==="image";
                              return <div>
                                <div style={{textAlign:"center",marginBottom:hideRule?8:24,paddingBottom:hideRule?8:16,borderBottom:hideRule?"none":`1px solid ${theme.border}`}}>
                                  <div style={{fontSize:10,letterSpacing:".2em",textTransform:"uppercase",opacity:.4,marginBottom:6}}>บทที่ {chapters.findIndex(c=>c.id===chId)+1}</div>
                                  <div style={{fontSize:18,fontWeight:700,color:theme.accent,fontFamily:`'${settings.font}',sans-serif`}}>{ch.title}</div>
                                </div>
                                <SceneDividerRenderer settings={settings} theme={theme} style={{marginBottom:16}}/>
                                {behindImgs.map(img=><ImageBlock key={img.id} image={img} selected={selectedImageId===img.id} onUpdate={handleUpdateImage} onDelete={handleDeleteImage} onSelect={setSelectedImageId} onOpenProperties={id=>{setSelectedImageId(id);setSidebarTab("image");setRightOpen(true);}} theme={theme}/>)}
                                {inlineImgs.map(img=><ImageBlock key={img.id} image={img} selected={selectedImageId===img.id} onUpdate={handleUpdateImage} onDelete={handleDeleteImage} onSelect={setSelectedImageId} onOpenProperties={id=>{setSelectedImageId(id);setSidebarTab("image");setRightOpen(true);}} theme={theme}/>)}
                              </div>;
                            })()}
                            footerEl={<div style={{width:layoutSize.px.w,marginTop:16}}><input value={ch.note||""} onChange={e=>updateChapter(ch.id,{note:e.target.value})} placeholder="📝 บันทึกส่วนตัว (ไม่ Export)..." style={{width:"100%",background:"transparent",border:`1px dashed ${theme.border}`,borderRadius:8,padding:"8px 12px",fontSize:12,color:theme.ink,opacity:.65,outline:"none"}}/></div>}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  );
                })()}

                {/* ── Split pane ── only when splitChId set ── */}
                {splitChId && (()=>{
                  const chId = splitChId;
                  const ch   = chapters.find(c=>c.id===chId)||null;
                  const chImages    = getImagesForChapter(images, chId);
                  const behindImgs  = chImages.filter(img=>img.wrapMode==="behind_text"||img.wrapMode==="in_front");
                  const inlineImgs  = chImages.filter(img=>["inline","square","tight"].includes(img.wrapMode));
                  return (
                  <div key="split" style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",borderLeft:`2px solid ${theme.accent}44`}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px",background:theme.panel,borderBottom:`1px solid ${theme.border}`,fontSize:11,flexShrink:0}}>
                      <span style={{opacity:.5}}>⊞</span>
                      <select value={chId} onChange={e=>setSplitChId(e.target.value)}
                        style={{flex:1,background:theme.bg,color:theme.ink,border:`1px solid ${theme.border}`,borderRadius:6,padding:"2px 6px",fontSize:11}}>
                        {chapters.map((c,i)=><option key={c.id} value={c.id}>{i+1}. {c.title||`บทที่ ${i+1}`}</option>)}
                      </select>
                      <button className="btn" onClick={()=>setSplitChId(null)} title="ปิด Split View" style={{padding:"2px 6px",fontSize:11}}>✕</button>
                    </div>
                    <div style={{flex:1,overflow:"auto",padding:"32px 24px",display:"flex",flexDirection:"column",alignItems:"center",position:"relative"}}
                      onClick={e=>{ if(!e.target.closest("[data-image-id]")&&selectedImageId) setSelectedImageId(null); }}>
                      <div style={{
                        width: layoutSize.px.w*(settings.zoom/100),
                        minWidth: layoutSize.px.w*(settings.zoom/100),
                        transform:`scale(${settings.zoom/100})`,
                        transformOrigin:"top left",
                        transition:".15s",
                        flexShrink:0,
                      }}>
                        {ch && (
                          <PaginatedEditor
                            chId={ch.id}
                            content={ch.content}
                            onChange={(id, html) => updateChapter(id, { content: html })}
                            theme={theme}
                            settings={settings}
                            layoutSize={layoutSize}
                            headerEl={(()=>{
                              const hideRule=settings.showChapterLine===false||settings.dividerDecor?.type==="svg"||settings.dividerDecor?.type==="image";
                              return <div>
                                <div style={{textAlign:"center",marginBottom:hideRule?8:24,paddingBottom:hideRule?8:16,borderBottom:hideRule?"none":`1px solid ${theme.border}`}}>
                                  <div style={{fontSize:10,letterSpacing:".2em",textTransform:"uppercase",opacity:.4,marginBottom:6}}>บทที่ {chapters.findIndex(c=>c.id===chId)+1}</div>
                                  <div style={{fontSize:18,fontWeight:700,color:theme.accent,fontFamily:`'${settings.font}',sans-serif`}}>{ch.title}</div>
                                </div>
                                <SceneDividerRenderer settings={settings} theme={theme} style={{marginBottom:16}}/>
                              </div>;
                            })()}
                            footerEl={<div style={{width:layoutSize.px.w,marginTop:16}}><input value={ch.note||""} onChange={e=>updateChapter(ch.id,{note:e.target.value})} placeholder="📝 บันทึกส่วนตัว (ไม่ Export)..." style={{width:"100%",background:"transparent",border:`1px dashed ${theme.border}`,borderRadius:8,padding:"8px 12px",fontSize:12,color:theme.ink,opacity:.65,outline:"none"}}/></div>}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  );
                })()}
              </div>
            </div>

            {/* Right panel */}
            {rightOpen && (
              <div style={{width:264,background:theme.panel,borderLeft:`1px solid ${theme.border}`,overflowY:"auto",flexShrink:0}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px 8px",borderBottom:`1px solid ${theme.border}`,position:"sticky",top:0,background:theme.panel,zIndex:10}}>
                  <span style={{fontSize:12,fontWeight:700,opacity:.85}}>
                    {{bookinfo:"📚 หนังสือ",chapters:"📑 บท",toc:"📋 สารบัญ",image:"🖼 รูปภาพ",typography:"Aa Typography",layout:"⊞ Layout",divider:"🎨 Divider & Decor",theme:"◑ Theme",backup:"🗄 Backup",stats:"📊 Statistics"}[sidebarTab]||"Settings"}
                  </span>
                  <button className="btn" onClick={()=>setRightOpen(false)}>×</button>
                </div>
                <div style={{padding:14}}>
                  <RightPanel tab={sidebarTab} book={book} settings={settings} chapters={chapters} theme={theme}
                    totalWords={totalWords} totalChars={totalChars} estPages={estPages} readMins={readMins}
                    writingGoal={writingGoal} goalInput={goalInput} setGoalInput={setGoalInput} setWritingGoal={setWritingGoal}
                    sessionWords={sessionWords} streakData={streakData}
                    projectTarget={projectTarget} setProjectTarget={setProjectTarget}
                    setBookField={setBookField} setSetting={setSetting}
                    FONTS={FONTS} THEMES={THEMES} COVER_TEMPLATES={COVER_TEMPLATES}
                    LAYOUT_PRESETS={LAYOUT_PRESETS} LAYOUT_SIZES={LAYOUT_SIZES} DIVIDERS={DIVIDERS}
                    onSave={exportProject} onLoad={importProject} onExportPDF={exportPDF}
                    onExportEPUB={exportEPUB}
                    onOpenSnapshots={()=>setShowSnapshotPanel(true)}
                    showToast={showToast} setChapters={setChapters}
                    wordCount={wordCount}
                    setParagraphFormat={setParagraphFormat}
                    setTypoOptions={setTypoOptions}
                    onApplyTypography={handleApplyTypography}
                    tocPreviewChapters={calcPageNumbers()}
                    selectedImage={selectedImage}
                    onUpdateImage={handleUpdateImage}
                    onDeleteImage={handleDeleteImage}
                    onInsertImage={handleInsertImage}
                    onSelectImage={setSelectedImageId}
                    chapterImages={activeChImages}
                  />
                </div>
              </div>
            )}
            {!rightOpen && (
              <button onClick={()=>setRightOpen(true)} style={{position:"absolute",right:0,top:"50%",transform:"translateY(-50%)",zIndex:10,background:theme.accent,color:"#fff",border:"none",borderRadius:"8px 0 0 8px",padding:"8px 4px",cursor:"pointer",fontSize:12}}>◁</button>
            )}
          </>
        )}

        {/* ─── BOOK STRUCTURE TAB ─── */}
        {mainTab === "structure" && (
          <BookStructurePanel
            bookStructure={bookStructure} setBookStructure={setBookStructure}
            chapters={chapters} specialPages={specialPages} setSpecialPages={setSpecialPages}
            theme={theme} showToast={showToast} book={book}
          />
        )}

        {/* ─── PREVIEW TAB ─── */}
        {mainTab === "preview" && (
          <BookPreviewPanel
            book={book} chapters={chapters} settings={settings} theme={theme}
            layoutSize={layoutSize} specialPages={specialPages}
            calcPageNumbers={calcPageNumbers}
            onJumpToChapter={(chId) => { setActiveChId(chId); setMainTab("editor"); }}
          />
        )}

        {/* ─── COVERS TAB ─── */}
        {mainTab === "covers" && (
          <CoversPanel
            settings={settings} setSetting={setSetting} book={book}
            theme={theme} showToast={showToast}
            COVER_TEMPLATES={COVER_TEMPLATES}
            onFrontCoverClick={()=>coverInput.current?.click()}
            onBackCoverClick={()=>backCoverInput.current?.click()}
            assets={assets}
          />
        )}

        {/* ─── CHARACTERS TAB ─── */}
        {mainTab === "characters" && (
          <CharactersPanel characters={characters} setCharacters={setCharacters} theme={theme} showToast={showToast} book={book} chapters={chapters} wordCount={wordCount}
            onMentionClick={(chId) => { setActiveChId(chId); setMainTab("editor"); }} />
        )}

        {/* ─── SCENE BOARD TAB ─── */}
        {mainTab === "scene_board" && (
          <SceneBoard
            scenes={scenes} chapters={chapters} theme={theme}
            onAdd={addScene} onUpdate={updateScene} onDelete={deleteScene}
            showToast={showToast}
          />
        )}

        {/* ─── TIMELINE TAB ─── */}
        {mainTab === "timeline" && (
          <TimelinePanel timeline={timeline} setTimeline={setTimeline} theme={theme} showToast={showToast} chapters={chapters} />
        )}

        {/* ─── WORLD BIBLE TAB ─── */}
        {mainTab === "world" && (
          <WorldBiblePanel world={world} setWorld={setWorld} theme={theme} showToast={showToast} />
        )}

        {/* ─── WORLD MAP TAB ─── (accessible from World Bible panel header) */}
        {mainTab === "worldmap" && (
          <WorldMapPanel world={world} setWorld={setWorld} theme={theme} showToast={showToast} />
        )}

        {/* ─── ASSETS TAB ─── */}
        {mainTab === "assets" && (
          <AssetsPanel
            assets={assets} theme={theme} showToast={showToast}
            onUpload={e=>handleAssetUpload(e)}
            onUploadWithCategory={handleAssetUpload}
            onDelete={deleteAsset}
            onUseFrontCover={useAssetAsCover}
            onUseBackCover={useAssetAsBackCover}
            assetInput={assetInput}
          />
        )}

        {/* ─── AI TOOLS TAB ─── */}
        {mainTab === "ai" && (
          <AIPanel
            theme={theme} aiTab={aiTab} setAiTab={setAiTab} aiInput={aiInput} setAiInput={setAiInput}
            aiLoading={aiLoading} aiResult={aiResult} setAiResult={setAiResult}
            onRun={()=>runAI(buildAIPrompt())}
            book={book} chapters={chapters} characters={characters} world={world}
            showToast={showToast}
            aiProvider={aiProvider} setAiProvider={saveAiProvider}
            aiKeys={aiKeys} setAiKeys={saveAiKeys}
            showAiSettings={showAiSettings} setShowAiSettings={setShowAiSettings}
          />
        )}

        {/* ─── DASHBOARD TAB (V27) ─── */}
        {mainTab === "dashboard" && (
          <StoryDashboard
            book={book}
            chapters={chapters}
            characters={characters}
            timeline={timeline}
            totalWords={totalWords}
            estPages={estPages}
            readMins={readMins}
            writingGoal={writingGoal}
            setWritingGoal={setWritingGoal}
            projectTarget={projectTarget}
            setProjectTarget={setProjectTarget}
            sessionWords={sessionWords}
            streakData={streakData}
            theme={theme}
            showToast={showToast}
            wordCount={wordCount}
            onOpenChapter={(chId) => { setActiveChId(chId); setMainTab("editor"); }}
          />
        )}

        {/* ─── MIND MAP TAB ─── */}
        {mainTab === "mindmap" && (
          <MindMapPanel
            mindMap={mindMap} setMindMap={setMindMap}
            characters={characters} chapters={chapters}
            theme={theme} showToast={showToast}
          />
        )}

        {/* ─── Series tab (V25) ─────────────────────────────────────────── */}
        {mainTab === "series" && activeSeriesObj && (
          <SeriesPanel
            series={activeSeriesObj}
            projects={projects}
            currentProjectId={activeProjectId}
            subTab={seriesSubTab}
            setSubTab={setSeriesSubTab}
            onUpdate={(patch) => updateSeries(activeSeriesObj.id, patch)}
            onUpdateBible={(patch) => updateSeriesBible(activeSeriesObj.id, patch)}
            onOpenProject={openProject}
            theme={theme}
            showToast={showToast}
          />
        )}
      </div>

      {/* Status bar */}
      <div className="statusbar" style={{background:theme.panel}}>
        <span>📝 {book.title||"Untitled"}</span>
        <span>✍️ {totalWords.toLocaleString()} คำ</span>
        <span>📖 ~{estPages} หน้า</span>
        <span>👤 {characters.length} ตัวละคร</span>
        <span>⏳ {timeline.length} เหตุการณ์</span>
        <span>📁 {assets.length} Assets</span>
        {/* V27: session words + streak */}
        {sessionWords > 0 && (
          <span style={{color:theme.accent,fontWeight:600}}>+{sessionWords.toLocaleString()} วันนี้</span>
        )}
        {streakData.streak > 0 && (
          <span title={`Streak ${streakData.streak} วัน · สูงสุด ${streakData.longestStreak} วัน`}
            style={{color:"#f97316",fontWeight:700,cursor:"pointer"}}
            onClick={()=>setMainTab("dashboard")}>
            🔥 {streakData.streak}
          </span>
        )}
        <div style={{flex:1}} />
        {activeCh && mainTab==="editor" && <span style={{opacity:.7}}>บทนี้: {wordCount(activeCh.content).toLocaleString()} คำ</span>}
        <span style={{opacity:.7}}>{readMins} น. อ่าน</span>
        <div style={{display:"flex",alignItems:"center",gap:1,borderLeft:`1px solid ${theme.border}`,paddingLeft:10,marginLeft:4}}>
          {[
            {id:"write",  icon:"✏️", title:"โหมดเขียน"},
            {id:"book",   icon:"📖", title:"โหมดหนังสือ"},
            {id:"kindle", icon:"📱", title:"Kindle"},
            {id:"print",  icon:"🖨️", title:"พิมพ์"},
            {id:"mobile", icon:"📲", title:"มือถือ"},
          ].map(m => (
            <button key={m.id} onClick={()=>setViewMode(m.id)} title={m.title}
              style={{
                padding:"1px 6px",fontSize:12,border:"none",borderRadius:5,cursor:"pointer",
                background:viewMode===m.id?theme.accent:"transparent",
                color:viewMode===m.id?"#fff":theme.ink,
                opacity:viewMode===m.id?1:.45,
                transition:".12s",lineHeight:1.6,
              }}>
              {m.icon}
            </button>
          ))}
          <div style={{width:1,background:theme.border,height:14,margin:"0 4px"}} />
          <button onClick={()=>{
            if(splitChId){ setSplitChId(null); }
            else { const o=chapters.find(c=>c.id!==activeChId); if(o) setSplitChId(o.id); else showToast("ต้องมี 2 บทขึ้นไป"); }
          }} title={splitChId?"ปิด Split View":"Split View"}
            style={{
              padding:"1px 6px",fontSize:11,border:"none",borderRadius:5,cursor:"pointer",
              background:splitChId?theme.accent:"transparent",
              color:splitChId?"#fff":theme.ink,
              opacity:splitChId?1:.45,
              transition:".12s",
            }}>
            {splitChId?"⊟":"⊞"}
          </button>
        </div>
      </div>

      {/* Find & Replace */}
      {showFR && (
        <div className="modal-bg" onClick={e=>{ if(e.target===e.currentTarget) setShowFR(false); }}>
          <div className="modal-box">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <span style={{fontWeight:700,fontSize:15}}>🔍 Find & Replace</span>
              <button className="btn" onClick={()=>setShowFR(false)}>×</button>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:11,opacity:.55,display:"block",marginBottom:4}}>ค้นหา</label>
              <input className="book-field" value={frQuery} onChange={e=>setFrQuery(e.target.value)} placeholder="ข้อความที่ต้องการหา..." />
            </div>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,opacity:.55,display:"block",marginBottom:4}}>แทนที่ด้วย</label>
              <input className="book-field" value={frReplace} onChange={e=>setFrReplace(e.target.value)} placeholder="ข้อความใหม่..." />
            </div>
            {frCount !== null && (
              <div style={{padding:"8px 12px",background:frCount>0?`${theme.accent}22`:`${theme.border}44`,borderRadius:8,marginBottom:12,fontSize:13}}>
                {frCount>0?`✅ พบ ${frCount} รายการ`:"❌ ไม่พบข้อความที่ค้นหา"}
              </div>
            )}
            <div style={{display:"flex",gap:8}}>
              <button className="btn" onClick={doSearchCount}>นับ</button>
              <button className="accent-btn" onClick={doReplaceAll}>แทนที่ทั้งหมด</button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file inputs for DOCX / Markdown / EPUB import */}
      <input ref={docxInput} type="file" accept=".docx" style={{display:"none"}} onChange={handleImportDOCX} />
      <input ref={mdInput}   type="file" accept=".md,.markdown,.txt" style={{display:"none"}} onChange={handleImportMarkdown} />
      <input ref={epubInput} type="file" accept=".epub" style={{display:"none"}} onChange={handleImportEPUB} />

      {/* Snapshot / Version History panel */}
      {showSnapshotPanel && (
        <SnapshotPanel
          snapshots={snapshots}
          onSave={saveSnapshot}
          onRestore={restoreSnapshot}
          onDelete={deleteSnapshot}
          onClose={()=>setShowSnapshotPanel(false)}
          theme={theme}
        />
      )}

      {/* 🖼 Image Insert Dialog */}
      {showImgInsertDialog && (
        <ImageInsertDialog
          theme={theme}
          onInsertUrl={(url, alt) => _doInsertImageWithSrc(url, alt)}
          onInsertBlank={handleInsertImageBlank}
          onClose={() => setShowImgInsertDialog(false)}
          onFileUpload={(dataUrl, fileName) => _doInsertImageWithSrc(dataUrl, fileName)}
        />
      )}

      {/* 💾 Save As dialog */}
      {showSaveAs && (
        <SaveAsDialog
          defaultName={(book.title||"project").replace(/[^a-zA-Z0-9ก-๙\-_ ]/g,"_").trim()}
          theme={theme}
          onSave={doSaveAs}
          onClose={()=>setShowSaveAs(false)}
        />
      )}

      {/* 🎨 Quick Style floating panel */}
      <QuickStylePanel
        settings={settings}
        setSetting={setSetting}
        theme={theme}
        visible={showQuickStyle && mainTab === "editor"}
        onClose={()=>setShowQuickStyle(false)}
      />
    </div>
  );
}
// ─── SERIES MODAL (Home — Create / Edit Series) ───────────────────────────────
const SeriesModal = memo(function SeriesModal({ theme, existing, projects, series, onClose, onCreate, onUpdate, onAddBook, onRemoveBook }) {
  const [title, setTitle]         = useState(existing?.title || "");
  const [desc, setDesc]           = useState(existing?.desc  || "");
  const [color, setColor]         = useState(existing?.coverColor || "#8b4513");
  const [pendingBooks, setPending] = useState([]); // for new series: books selected before save
  const isEdit = !!existing;

  async function handleSave() {
    if (!title.trim()) return;
    if (isEdit) {
      onUpdate(existing.id, { title:title.trim(), desc, coverColor:color });
    } else {
      // สร้าง series แล้ว link books ที่เลือกไว้ทันที
      const newS = await onCreate(title, desc, color);
      if (newS && pendingBooks.length > 0) {
        for (const pid of pendingBooks) {
          await onAddBook(pid, newS.id);
        }
      }
    }
  }

  // books ที่เลือกระหว่างสร้างใหม่ (แสดงเป็น badge)
  const pendingProjects = projects.filter(p => pendingBooks.includes(p.id));

  const available = projects.filter(p => !p.seriesId || p.seriesId === existing?.id);
  const inSeries  = existing ? projects.filter(p => p.seriesId === existing.id) : [];

  // dropdown: กรอง projects ที่ไม่ได้อยู่ใน series อื่น และยังไม่ได้เลือกใน pending
  const availableForNew = projects.filter(p => (!p.seriesId) && !pendingBooks.includes(p.id));

  return (
    <div className="modal-bg" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="modal-box fade-in" style={{maxWidth:520,width:"100%"}}>
        <div style={{fontWeight:800,fontSize:17,marginBottom:16}}>
          {isEdit ? "✏️ แก้ไขชุดนิยาย" : "📚 สร้างชุดนิยายใหม่"}
        </div>
        <div style={{marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:40,height:40,borderRadius:10,background:color,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>📚</div>
          <div style={{flex:1}}>
            <label style={{fontSize:11,opacity:.6,display:"block",marginBottom:3}}>สีธีม</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["#8b4513","#8b5cf6","#ec4899","#06b6d4","#22c55e","#f59e0b","#ef4444","#0f172a"].map(c=>(
                <button key={c} onClick={()=>setColor(c)} style={{width:22,height:22,borderRadius:6,background:c,border:color===c?"3px solid #fff":"1px solid #0002",cursor:"pointer",outline:color===c?`2px solid ${c}`:""}} />
              ))}
              <input type="color" value={color} onChange={e=>setColor(e.target.value)} style={{width:22,height:22,border:"none",padding:0,cursor:"pointer",borderRadius:4}} />
            </div>
          </div>
        </div>
        <div style={{marginBottom:10}}>
          <label style={{fontSize:11,opacity:.6,display:"block",marginBottom:3}}>ชื่อชุดนิยาย *</label>
          <input className="book-field" value={title} onChange={e=>setTitle(e.target.value)}
            placeholder="เช่น The Shattered Realms Series..." autoFocus
            onKeyDown={e=>{ if(e.key==="Enter") handleSave(); }} />
        </div>
        <div style={{marginBottom:16}}>
          <label style={{fontSize:11,opacity:.6,display:"block",marginBottom:3}}>คำอธิบาย</label>
          <input className="book-field" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="เรื่องย่อหรือ tagline..." />
        </div>

        {/* ─── เล่มในชุดนิยาย: แสดงทั้งตอน create และ edit ─── */}
        <div style={{marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,opacity:.6,marginBottom:8}}>เล่มในชุดนิยาย</div>

          {/* Edit mode: แสดง books ที่ link แล้ว */}
          {isEdit && (
            <>
              {inSeries.length === 0 && <div style={{fontSize:12,opacity:.4,marginBottom:8}}>ยังไม่มีเล่ม</div>}
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
                {inSeries.map((p,i)=>(
                  <div key={p.id} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 8px 3px 10px",background:color+"22",border:`1px solid ${color}44`,borderRadius:20,fontSize:11,color}}>
                    <span>{i+1}. {p.book?.title||p.name}</span>
                    <button onClick={()=>onRemoveBook(p.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#ef4444",fontSize:13,lineHeight:1,padding:0,marginLeft:2}}>×</button>
                  </div>
                ))}
              </div>
              {available.filter(p=>p.seriesId!==existing.id).length > 0 && (
                <div>
                  <label style={{fontSize:11,opacity:.55,display:"block",marginBottom:4}}>เพิ่มเล่ม:</label>
                  <select onChange={e=>{ if(e.target.value){onAddBook(e.target.value,existing.id);e.target.value="";} }}
                    defaultValue="" style={{padding:"5px 8px",border:`1px solid ${theme.border}`,borderRadius:7,background:theme.bg,color:theme.ink,fontSize:12}}>
                    <option value="">— เลือกโปรเจกต์ —</option>
                    {available.filter(p=>p.seriesId!==existing.id).map(p=>(
                      <option key={p.id} value={p.id}>{p.book?.title||p.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}

          {/* Create mode: pending books (จะ link หลัง save) */}
          {!isEdit && (
            <>
              {pendingProjects.length === 0 && <div style={{fontSize:12,opacity:.4,marginBottom:8}}>ยังไม่ได้เลือกเล่ม (ไม่บังคับ)</div>}
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
                {pendingProjects.map((p,i)=>(
                  <div key={p.id} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 8px 3px 10px",background:color+"22",border:`1px solid ${color}44`,borderRadius:20,fontSize:11,color}}>
                    <span>{i+1}. {p.book?.title||p.name}</span>
                    <button onClick={()=>setPending(prev=>prev.filter(id=>id!==p.id))} style={{background:"none",border:"none",cursor:"pointer",color:"#ef4444",fontSize:13,lineHeight:1,padding:0,marginLeft:2}}>×</button>
                  </div>
                ))}
              </div>
              {availableForNew.length > 0 && (
                <div>
                  <label style={{fontSize:11,opacity:.55,display:"block",marginBottom:4}}>เพิ่มเล่ม:</label>
                  <select onChange={e=>{ if(e.target.value){ setPending(prev=>[...prev,e.target.value]); e.target.value=""; } }}
                    defaultValue="" style={{padding:"5px 8px",border:`1px solid ${theme.border}`,borderRadius:7,background:theme.bg,color:theme.ink,fontSize:12}}>
                    <option value="">— เลือกโปรเจกต์ —</option>
                    {availableForNew.map(p=>(
                      <option key={p.id} value={p.id}>{p.book?.title||p.name}</option>
                    ))}
                  </select>
                </div>
              )}
              {availableForNew.length === 0 && projects.filter(p=>!p.seriesId).length === 0 && (
                <div style={{fontSize:11,opacity:.4}}>โปรเจกต์ทั้งหมดอยู่ใน Series แล้ว</div>
              )}
            </>
          )}
        </div>

        <div style={{display:"flex",gap:8}}>
          <button className="accent-btn" onClick={handleSave} disabled={!title.trim()} style={{opacity:title.trim()?1:.4}}>
            {isEdit ? "💾 บันทึก" : "📚 สร้าง"}
          </button>
          <button className="btn" onClick={onClose} style={{padding:"7px 16px",fontSize:13}}>ยกเลิก</button>
        </div>
      </div>
    </div>
  );
});

// ─── SERIES PANEL (Editor tab) ────────────────────────────────────────────────
const SeriesPanel = memo(function SeriesPanel({ series, projects, currentProjectId, subTab, setSubTab, onUpdate, onUpdateBible, onOpenProject, theme, showToast }) {
  const bible  = series.seriesBible || {};
  const books  = (series.bookIds || []).map(id => projects.find(p => p.id === id)).filter(Boolean);
  const accent = theme.accent;
  const border = theme.border;
  const ink    = theme.ink;
  const bg     = theme.panel;

  const SUB_TABS = [
    { id:"bible",       icon:"📖", label:"Bible"       },
    { id:"consistency", icon:"🔗", label:"Consistency" },
    { id:"arcs",        icon:"🌀", label:"Arcs"        },
    { id:"plots",       icon:"🧵", label:"Plots"       },
  ];

  const rowStyle   = { display:"flex",gap:8,alignItems:"flex-start",padding:"10px",background:theme.bg,borderRadius:10,border:`1px solid ${border}`,marginBottom:8 };
  const iStyle     = { padding:"5px 8px",border:`1px solid ${border}`,borderRadius:7,background:bg,color:ink,fontSize:12,outline:"none",flex:1 };
  const sStyle     = { ...iStyle, flex:"none",width:90 };
  const delBtn     = { background:"none",border:"none",cursor:"pointer",color:"#ef4444",fontSize:18,padding:"2px",lineHeight:1,flexShrink:0 };

  function bibleUpdate(patch) { onUpdateBible(patch); }
  function addRule()      { bibleUpdate({ rules:        [...(bible.rules||[]),        { id:newId(), title:"กฎใหม่",        content:"" }] }); }
  function updateRule(id,p){ bibleUpdate({ rules:        (bible.rules||[]).map(r=>r.id===id?{...r,...p}:r) }); }
  function delRule(id)    { bibleUpdate({ rules:        (bible.rules||[]).filter(r=>r.id!==id) }); }

  function addEvt()       { bibleUpdate({ crossTimeline:[...(bible.crossTimeline||[]),{ id:newId(), year:"", title:"", desc:"", bookId:"" }] }); }
  function updateEvt(id,p){ bibleUpdate({ crossTimeline:(bible.crossTimeline||[]).map(e=>e.id===id?{...e,...p}:e) }); }
  function delEvt(id)     { bibleUpdate({ crossTimeline:(bible.crossTimeline||[]).filter(e=>e.id!==id) }); }

  function addCa()        { bibleUpdate({ charAgeMap:   [...(bible.charAgeMap||[]),   { id:newId(), charName:"", birthYear:"", notes:"" }] }); }
  function updateCa(id,p) { bibleUpdate({ charAgeMap:   (bible.charAgeMap||[]).map(c=>c.id===id?{...c,...p}:c) }); }
  function delCa(id)      { bibleUpdate({ charAgeMap:   (bible.charAgeMap||[]).filter(c=>c.id!==id) }); }

  function addArc()       { bibleUpdate({ arcs:         [...(bible.arcs||[]),         { id:newId(), title:"Arc ใหม่", desc:"", bookIds:[], status:"ongoing" }] }); }
  function updateArc(id,p){ bibleUpdate({ arcs:         (bible.arcs||[]).map(a=>a.id===id?{...a,...p}:a) }); }
  function delArc(id)     { bibleUpdate({ arcs:         (bible.arcs||[]).filter(a=>a.id!==id) }); }

  function addPlot()      { bibleUpdate({ plots:        [...(bible.plots||[]),        { id:newId(), title:"Plot ใหม่", desc:"", status:"open", bookId:currentProjectId }] }); }
  function updatePlot(id,p){ bibleUpdate({ plots:       (bible.plots||[]).map(p2=>p2.id===id?{...p2,...p}:p2) }); }
  function delPlot(id)    { bibleUpdate({ plots:        (bible.plots||[]).filter(p2=>p2.id!==id) }); }

  const Empty = ({icon,msg})=>(
    <div style={{textAlign:"center",padding:"40px 0",opacity:.3}}>
      <div style={{fontSize:36,marginBottom:8}}>{icon}</div>
      <div style={{fontSize:13}}>{msg}</div>
    </div>
  );

  return (
    <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column",background:bg}}>
      {/* Header */}
      <div style={{padding:"12px 20px",borderBottom:`1px solid ${border}`,display:"flex",alignItems:"center",gap:10,flexShrink:0,flexWrap:"wrap"}}>
        <div style={{width:28,height:28,borderRadius:7,background:series.coverColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>📚</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,fontSize:13,color:series.coverColor,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{series.title}</div>
          {series.desc && <div style={{fontSize:10,opacity:.5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{series.desc}</div>}
        </div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          {books.map((b,i)=>(
            <button key={b.id} onClick={()=>onOpenProject(b)}
              style={{padding:"2px 9px",fontSize:10,border:`1px solid ${b.id===currentProjectId?accent:border}`,borderRadius:20,background:b.id===currentProjectId?accent+"22":"transparent",color:b.id===currentProjectId?accent:ink,cursor:"pointer",fontWeight:b.id===currentProjectId?700:400}}>
              {i+1}. {b.book?.title||b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-tabs */}
      <div style={{display:"flex",gap:2,padding:"8px 14px",borderBottom:`1px solid ${border}`,flexShrink:0}}>
        {SUB_TABS.map(t=>(
          <button key={t.id} onClick={()=>setSubTab(t.id)}
            style={{padding:"4px 13px",borderRadius:8,border:`1px solid ${subTab===t.id?accent:border}`,background:subTab===t.id?accent+"22":"transparent",color:subTab===t.id?accent:ink,fontSize:11,fontWeight:subTab===t.id?700:400,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{flex:1,overflow:"auto",padding:"18px 20px"}}>

        {/* BIBLE */}
        {subTab==="bible" && <>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div style={{fontWeight:700,fontSize:13}}>📖 Series Bible — กฎโลก / ระบบ / Canon</div>
            <button className="btn" style={{padding:"4px 12px",fontSize:11}} onClick={addRule}>+ เพิ่มกฎ</button>
          </div>
          {(bible.rules||[]).length===0 && <Empty icon="📖" msg="ยังไม่มีกฎ Bible — กด + เพิ่มกฎ" />}
          {(bible.rules||[]).map(r=>(
            <div key={r.id} style={rowStyle}>
              <div style={{flex:1}}>
                <input value={r.title} onChange={e=>updateRule(r.id,{title:e.target.value})}
                  placeholder="ชื่อกฎ / หัวข้อ..." style={{...iStyle,fontWeight:700,marginBottom:6,width:"100%"}} />
                <textarea value={r.content} onChange={e=>updateRule(r.id,{content:e.target.value})}
                  placeholder="รายละเอียด Canon..."
                  style={{...iStyle,width:"100%",minHeight:68,resize:"vertical",lineHeight:1.6,boxSizing:"border-box"}} />
              </div>
              <button onClick={()=>delRule(r.id)} style={delBtn}>×</button>
            </div>
          ))}
        </>}

        {/* CONSISTENCY */}
        {subTab==="consistency" && <>
          <div style={{marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{fontWeight:700,fontSize:13}}>⏳ Cross-Book Timeline</div>
              <button className="btn" style={{padding:"4px 12px",fontSize:11}} onClick={addEvt}>+ เพิ่ม</button>
            </div>
            {(bible.crossTimeline||[]).length===0 && <div style={{fontSize:12,opacity:.4,padding:"8px 0"}}>ยังไม่มี Timeline ข้ามเล่ม</div>}
            {(bible.crossTimeline||[]).map(ev=>(
              <div key={ev.id} style={rowStyle}>
                <input value={ev.year} onChange={e=>updateEvt(ev.id,{year:e.target.value})} placeholder="ปี/ยุค" style={{...sStyle,width:70}} />
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}>
                  <input value={ev.title} onChange={e=>updateEvt(ev.id,{title:e.target.value})} placeholder="ชื่อเหตุการณ์..." style={iStyle} />
                  <input value={ev.desc}  onChange={e=>updateEvt(ev.id,{desc:e.target.value})}  placeholder="รายละเอียด..." style={iStyle} />
                </div>
                <select value={ev.bookId||""} onChange={e=>updateEvt(ev.id,{bookId:e.target.value})} style={{...sStyle,width:105}}>
                  <option value="">ทุกเล่ม</option>
                  {books.map(b=><option key={b.id} value={b.id}>{b.book?.title||b.name}</option>)}
                </select>
                <button onClick={()=>delEvt(ev.id)} style={delBtn}>×</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{fontWeight:700,fontSize:13}}>👤 Character Age Tracker</div>
              <button className="btn" style={{padding:"4px 12px",fontSize:11}} onClick={addCa}>+ เพิ่ม</button>
            </div>
            {(bible.charAgeMap||[]).length===0 && <div style={{fontSize:12,opacity:.4,padding:"8px 0"}}>ยังไม่มี Age Map</div>}
            {(bible.charAgeMap||[]).map(c=>(
              <div key={c.id} style={rowStyle}>
                <input value={c.charName}  onChange={e=>updateCa(c.id,{charName:e.target.value})}  placeholder="ชื่อตัวละคร" style={{...iStyle,maxWidth:130}} />
                <input value={c.birthYear} onChange={e=>updateCa(c.id,{birthYear:e.target.value})} placeholder="ปีเกิด" style={{...sStyle,width:80}} />
                <input value={c.notes}     onChange={e=>updateCa(c.id,{notes:e.target.value})}     placeholder="หมายเหตุ / อายุแต่ละเล่ม..." style={iStyle} />
                <button onClick={()=>delCa(c.id)} style={delBtn}>×</button>
              </div>
            ))}
          </div>
        </>}

        {/* ARCS */}
        {subTab==="arcs" && <>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div style={{fontWeight:700,fontSize:13}}>🌀 Story Arcs ข้ามเล่ม</div>
            <button className="btn" style={{padding:"4px 12px",fontSize:11}} onClick={addArc}>+ เพิ่ม Arc</button>
          </div>
          {(bible.arcs||[]).length===0 && <Empty icon="🌀" msg="ยังไม่มี Arc — กด + เพิ่ม Arc" />}
          {(bible.arcs||[]).map(arc=>(
            <div key={arc.id} style={{...rowStyle,flexDirection:"column"}}>
              <div style={{display:"flex",gap:8,width:"100%",alignItems:"center"}}>
                <input value={arc.title} onChange={e=>updateArc(arc.id,{title:e.target.value})} placeholder="ชื่อ Arc..." style={{...iStyle,fontWeight:700}} />
                <select value={arc.status} onChange={e=>updateArc(arc.id,{status:e.target.value})} style={{...sStyle,width:110}}>
                  <option value="planned">📋 Planned</option>
                  <option value="ongoing">🔄 Ongoing</option>
                  <option value="resolved">✅ Resolved</option>
                </select>
                <button onClick={()=>delArc(arc.id)} style={delBtn}>×</button>
              </div>
              <textarea value={arc.desc} onChange={e=>updateArc(arc.id,{desc:e.target.value})}
                placeholder="รายละเอียด Arc..."
                style={{...iStyle,width:"100%",minHeight:52,resize:"vertical",lineHeight:1.6,boxSizing:"border-box",marginTop:6}} />
              <div style={{marginTop:8,display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}>
                <span style={{fontSize:10,opacity:.5}}>เล่มที่เกี่ยวข้อง:</span>
                {books.map(b=>{
                  const has=(arc.bookIds||[]).includes(b.id);
                  return <button key={b.id} onClick={()=>{const cur=arc.bookIds||[];updateArc(arc.id,{bookIds:has?cur.filter(x=>x!==b.id):[...cur,b.id]});}}
                    style={{padding:"2px 9px",fontSize:10,borderRadius:20,border:`1px solid ${has?accent:border}`,background:has?accent+"22":"transparent",color:has?accent:ink,cursor:"pointer",fontWeight:has?700:400}}>{b.book?.title||b.name}</button>;
                })}
              </div>
            </div>
          ))}
        </>}

        {/* PLOTS */}
        {subTab==="plots" && <>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div style={{fontWeight:700,fontSize:13}}>🧵 Plot Threads</div>
            <button className="btn" style={{padding:"4px 12px",fontSize:11}} onClick={addPlot}>+ เพิ่ม Plot</button>
          </div>
          {(bible.plots||[]).length===0 && <Empty icon="🧵" msg="ยังไม่มี Plot Thread — กด + เพิ่ม Plot" />}
          {(bible.plots||[]).map(plot=>(
            <div key={plot.id} style={{...rowStyle,flexDirection:"column"}}>
              <div style={{display:"flex",gap:8,width:"100%",alignItems:"center"}}>
                <input value={plot.title} onChange={e=>updatePlot(plot.id,{title:e.target.value})} placeholder="ชื่อ Plot Thread..." style={{...iStyle,fontWeight:700}} />
                <select value={plot.status} onChange={e=>updatePlot(plot.id,{status:e.target.value})} style={{...sStyle,width:115}}>
                  <option value="open">🔓 Open</option>
                  <option value="resolved">✅ Resolved</option>
                  <option value="abandoned">🚫 Abandoned</option>
                </select>
                <select value={plot.bookId||""} onChange={e=>updatePlot(plot.id,{bookId:e.target.value})} style={{...sStyle,width:120}}>
                  <option value="">ทุกเล่ม</option>
                  {books.map(b=><option key={b.id} value={b.id}>{b.book?.title||b.name}</option>)}
                </select>
                <button onClick={()=>delPlot(plot.id)} style={delBtn}>×</button>
              </div>
              <textarea value={plot.desc} onChange={e=>updatePlot(plot.id,{desc:e.target.value})}
                placeholder="รายละเอียด / หมายเหตุ..."
                style={{...iStyle,width:"100%",minHeight:52,resize:"vertical",lineHeight:1.6,boxSizing:"border-box",marginTop:6}} />
            </div>
          ))}
        </>}

      </div>
    </div>
  );
});

// ─── MIND MAP PANEL ───────────────────────────────────────────────────────────
function MindMapPanel({ mindMap, setMindMap, characters, chapters, theme, showToast }) {
  const svgRef      = useRef(null);
  const [dragging, setDragging]   = useState(null);   // {nodeId, ox, oy}
  const [connecting, setConnecting] = useState(null); // nodeId being dragged for edge
  const [selected, setSelected]   = useState([]);     // selected node ids
  const [editingId, setEditingId] = useState(null);
  const [editVal, setEditVal]     = useState("");
  const [offset, setOffset]       = useState({x:0,y:0});
  const [zoom, setZoom]           = useState(1);
  const [pannning, setPanning]    = useState(null);   // {sx,sy,ox,oy}

  const nodes = mindMap.nodes || [];
  const edges = mindMap.edges || [];

  function setNodes(fn) { setMindMap(m => ({ ...m, nodes: typeof fn==="function"?fn(m.nodes||[]):fn })); }
  function setEdges(fn) { setMindMap(m => ({ ...m, edges: typeof fn==="function"?fn(m.edges||[]):fn })); }

  function addNode(label="Node ใหม่", color=theme.accent) {
    const id = "n"+Date.now();
    setNodes(ns => [...ns, { id, label, x: 120+Math.random()*400, y: 80+Math.random()*300, color }]);
  }
  function addFromCharacters() {
    const existing = new Set(nodes.map(n=>n.label));
    const toAdd = characters.filter(c=>!existing.has(c.name));
    if(!toAdd.length){ showToast("ตัวละครทั้งหมดมีใน Map แล้ว"); return; }
    setNodes(ns => [...ns, ...toAdd.map(c=>({ id:"n"+newId(), label:c.name, x:120+Math.random()*500, y:80+Math.random()*350, color:theme.accent }))]);
    showToast(`➕ เพิ่ม ${toAdd.length} ตัวละคร`);
  }
  function addFromChapters() {
    const existing = new Set(nodes.map(n=>n.label));
    const toAdd = chapters.filter(c=>!existing.has(c.title||"บทที่"));
    setNodes(ns => [...ns, ...toAdd.map(c=>({ id:"n"+newId(), label:c.title||"บทที่", x:120+Math.random()*500, y:80+Math.random()*350, color:"#6366f1" }))]);
    showToast(`➕ เพิ่ม ${toAdd.length} บท`);
  }
  function deleteSelected() {
    if(!selected.length) return;
    setNodes(ns => ns.filter(n=>!selected.includes(n.id)));
    setEdges(es => es.filter(e=>!selected.includes(e.from)&&!selected.includes(e.to)));
    setSelected([]);
  }
  function connectSelected() {
    if(selected.length!==2){ showToast("เลือก 2 node ก่อน"); return; }
    const [a,b]=selected;
    const exists = edges.find(e=>(e.from===a&&e.to===b)||(e.from===b&&e.to===a));
    if(exists){ showToast("มีเส้นเชื่อมแล้ว"); return; }
    setEdges(es => [...es, { id:"e"+Date.now(), from:a, to:b, label:"" }]);
    setSelected([]);
  }
  function deleteEdge(id) { setEdges(es=>es.filter(e=>e.id!==id)); }

  function toSVG(e) {
    const rect = svgRef.current?.getBoundingClientRect();
    if(!rect) return {x:0,y:0};
    return { x:(e.clientX-rect.left-offset.x)/zoom, y:(e.clientY-rect.top-offset.y)/zoom };
  }

  function onMouseDown(e) {
    const nodeEl = e.target.closest("[data-nid]");
    if(nodeEl) {
      const nid = nodeEl.dataset.nid;
      const node = nodes.find(n=>n.id===nid);
      if(!node) return;
      if(e.shiftKey) { setSelected(s=>s.includes(nid)?s.filter(x=>x!==nid):[...s,nid]); return; }
      setDragging({ nodeId:nid, ox: toSVG(e).x-node.x, oy: toSVG(e).y-node.y });
      if(!selected.includes(nid)) setSelected([nid]);
      e.stopPropagation();
      return;
    }
    // pan background
    setPanning({ sx:e.clientX, sy:e.clientY, ox:offset.x, oy:offset.y });
    setSelected([]);
  }
  function onMouseMove(e) {
    if(dragging) {
      const p = toSVG(e);
      setNodes(ns => ns.map(n => n.id===dragging.nodeId ? {...n, x:p.x-dragging.ox, y:p.y-dragging.oy} : n));
    }
    if(pannning) {
      setOffset({ x:pannning.ox+(e.clientX-pannning.sx), y:pannning.oy+(e.clientY-pannning.sy) });
    }
  }
  function onMouseUp() { setDragging(null); setPanning(null); }
  function onWheel(e) { e.preventDefault(); setZoom(z=>Math.max(0.3,Math.min(2.5,z-e.deltaY*0.001))); }

  function startEdit(node) { setEditingId(node.id); setEditVal(node.label); }
  function commitEdit() {
    if(!editingId) return;
    setNodes(ns=>ns.map(n=>n.id===editingId?{...n,label:editVal}:n));
    setEditingId(null);
  }

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",background:theme.bg}}>
      {/* Toolbar */}
      <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",background:theme.panel,borderBottom:`1px solid ${theme.border}`,flexShrink:0,flexWrap:"wrap"}}>
        <button className="btn" onClick={()=>addNode()} style={{fontSize:11}}>➕ Node</button>
        <button className="btn" onClick={addFromCharacters} style={{fontSize:11}}>👤 จากตัวละคร</button>
        <button className="btn" onClick={addFromChapters} style={{fontSize:11}}>📑 จากบท</button>
        <div style={{width:1,background:theme.border,height:16,margin:"0 2px"}}/>
        <button className="btn" onClick={connectSelected} style={{fontSize:11,color:selected.length===2?theme.accent:undefined}}>🔗 เชื่อม</button>
        <button className="btn" onClick={deleteSelected} style={{fontSize:11,color:selected.length?"#ef4444":undefined}}>🗑 ลบ</button>
        <div style={{flex:1}}/>
        <span style={{fontSize:10,opacity:.4}}>Scroll=zoom · Drag=pan · Shift+click=เลือก · Double-click=แก้ชื่อ</span>
        <button className="btn" style={{fontSize:11}} onClick={()=>setZoom(1)}>100%</button>
        <span style={{fontSize:11,opacity:.5,minWidth:36,textAlign:"right"}}>{Math.round(zoom*100)}%</span>
      </div>
      {/* Canvas */}
      <div style={{flex:1,overflow:"hidden",position:"relative",cursor:pannning?"grabbing":"default"}}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
        onWheel={onWheel}>
        <svg ref={svgRef} width="100%" height="100%" style={{display:"block"}}>
          <g transform={`translate(${offset.x},${offset.y}) scale(${zoom})`}>
            {/* Edges */}
            {edges.map(e=>{
              const a=nodes.find(n=>n.id===e.from); const b=nodes.find(n=>n.id===e.to);
              if(!a||!b) return null;
              const mx=(a.x+b.x)/2; const my=(a.y+b.y)/2;
              return (
                <g key={e.id}>
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={theme.border} strokeWidth={1.5} strokeDasharray="4 3" opacity={0.7}/>
                  <circle cx={mx} cy={my} r={7} fill={theme.panel} stroke={theme.border} strokeWidth={1} style={{cursor:"pointer"}} onClick={()=>deleteEdge(e.id)}/>
                  <text x={mx} y={my+4} textAnchor="middle" fontSize={9} fill={theme.ink} opacity={.6} style={{pointerEvents:"none"}}>×</text>
                </g>
              );
            })}
            {/* Nodes */}
            {nodes.map(n=>{
              const isSel = selected.includes(n.id);
              const W=Math.max(80,n.label.length*8+24); const H=36;
              return (
                <g key={n.id} data-nid={n.id} transform={`translate(${n.x-W/2},${n.y-H/2})`}
                  onDoubleClick={()=>startEdit(n)} style={{cursor:"grab"}}>
                  <rect width={W} height={H} rx={10} ry={10}
                    fill={isSel?n.color:theme.panel}
                    stroke={isSel?n.color:theme.border}
                    strokeWidth={isSel?2:1}
                    style={{filter:isSel?"drop-shadow(0 0 6px "+n.color+"88)":"none"}}/>
                  {editingId===n.id ? (
                    <foreignObject x={4} y={6} width={W-8} height={24}>
                      <input autoFocus value={editVal} onChange={e=>setEditVal(e.target.value)}
                        onBlur={commitEdit} onKeyDown={e=>{ if(e.key==="Enter"||e.key==="Escape") commitEdit(); }}
                        style={{width:"100%",border:"none",background:"transparent",fontSize:12,outline:"none",color:theme.ink,textAlign:"center"}}/>
                    </foreignObject>
                  ) : (
                    <text x={W/2} y={H/2+5} textAnchor="middle" fontSize={12}
                      fill={isSel?"#fff":theme.ink} style={{pointerEvents:"none",userSelect:"none"}}>
                      {n.label.length>16?n.label.slice(0,15)+"…":n.label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
        {nodes.length===0 && (
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:.35,pointerEvents:"none"}}>
            <div style={{fontSize:48}}>🗺</div>
            <div style={{fontSize:13,marginTop:8}}>กด "➕ Node" หรือ "👤 จากตัวละคร" เพื่อเริ่ม</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── WORLD MAP PANEL ──────────────────────────────────────────────────────────
function WorldMapPanel({ world, setWorld, theme, showToast }) {
  const canvasRef = useRef(null);
  const [offset, setOffset]   = useState({x:0,y:0});
  const [zoom, setZoom]       = useState(1);
  const [panning, setPanning] = useState(null);
  const [draggingPin, setDraggingPin] = useState(null);
  const [popup, setPopup]     = useState(null); // {pin, cx, cy}
  const [editPin, setEditPin] = useState(null); // editing pin id
  const [editVal, setEditVal] = useState({name:"",desc:""});

  const pins = world?.mapPins || [];
  function setPins(fn) {
    setWorld(w => ({ ...w, mapPins: typeof fn==="function"?fn(w.mapPins||[]):fn }));
  }

  // Auto-populate pins from world.locations that don't have a pin yet
  useEffect(()=>{
    const locs = world?.locations||[];
    if(!locs.length) return;
    setPins(ps => {
      const existing = new Set(ps.map(p=>p.locId));
      const toAdd = locs.filter(l=>!existing.has(l.id));
      if(!toAdd.length) return ps;
      return [...ps, ...toAdd.map((l,i)=>({ id:"p"+newId(), locId:l.id, name:l.name||"สถานที่", desc:l.desc||"", x:120+i*90, y:120+(i%3)*80, color:theme.accent }))];
    });
  },[world?.locations?.length]);

  function toWorld(cx,cy) {
    const rect = canvasRef.current?.getBoundingClientRect();
    if(!rect) return {x:0,y:0};
    return { x:(cx-rect.left-offset.x)/zoom, y:(cy-rect.top-offset.y)/zoom };
  }

  function onMouseDown(e) {
    const pinEl = e.target.closest("[data-pid]");
    if(pinEl) {
      const pid = pinEl.dataset.pid;
      const pin = pins.find(p=>p.id===pid);
      if(!pin) return;
      setDraggingPin({ id:pid, ox:toWorld(e.clientX,e.clientY).x-pin.x, oy:toWorld(e.clientX,e.clientY).y-pin.y });
      setPopup(null);
      e.stopPropagation(); return;
    }
    setPanning({ sx:e.clientX, sy:e.clientY, ox:offset.x, oy:offset.y });
    setPopup(null);
  }
  function onMouseMove(e) {
    if(draggingPin) {
      const p = toWorld(e.clientX,e.clientY);
      setPins(ps=>ps.map(pin=>pin.id===draggingPin.id?{...pin,x:p.x-draggingPin.ox,y:p.y-draggingPin.oy}:pin));
    }
    if(panning) {
      setOffset({ x:panning.ox+(e.clientX-panning.sx), y:panning.oy+(e.clientY-panning.sy) });
    }
  }
  function onMouseUp(e) {
    if(draggingPin){ setDraggingPin(null); return; }
    if(panning){ setPanning(null); return; }
  }
  function onWheel(e) { e.preventDefault(); setZoom(z=>Math.max(0.25,Math.min(3,z-e.deltaY*0.001))); }
  function onClick(e) {
    if(draggingPin||panning) return;
    const pinEl = e.target.closest("[data-pid]");
    if(pinEl) {
      const pid = pinEl.dataset.pid;
      const pin = pins.find(p=>p.id===pid);
      if(pin) setPopup({ pin, cx:e.clientX, cy:e.clientY });
      return;
    }
    // click empty → add pin
    const p = toWorld(e.clientX,e.clientY);
    const id = "p"+newId();
    setPins(ps=>[...ps,{ id, locId:null, name:"สถานที่ใหม่", desc:"", x:p.x, y:p.y, color:theme.accent }]);
    showToast("📍 เพิ่ม pin — double-click เพื่อแก้ชื่อ");
  }
  function deletePin(id) { setPins(ps=>ps.filter(p=>p.id!==id)); setPopup(null); }
  function startEditPin(pin) { setEditPin(pin.id); setEditVal({name:pin.name,desc:pin.desc||""}); setPopup(null); }
  function commitEditPin() {
    setPins(ps=>ps.map(p=>p.id===editPin?{...p,...editVal}:p));
    setEditPin(null);
  }

  const gridSize = 60;
  const gridColor = theme.border+"44";

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",background:theme.bg}}>
      {/* Toolbar */}
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"6px 14px",background:theme.panel,borderBottom:`1px solid ${theme.border}`,flexShrink:0}}>
        <span style={{fontSize:12,fontWeight:600,opacity:.7}}>🌐 World Map</span>
        <span style={{fontSize:10,opacity:.4}}>คลิกพื้นที่ = เพิ่ม pin · ลาก pin ย้ายตำแหน่ง · คลิก pin = popup</span>
        <div style={{flex:1}}/>
        <button className="btn" style={{fontSize:11}} onClick={()=>{setZoom(1);setOffset({x:0,y:0});}}>Reset View</button>
        <span style={{fontSize:11,opacity:.5}}>{Math.round(zoom*100)}%</span>
        <span style={{fontSize:10,opacity:.4,marginLeft:4}}>{pins.length} pins</span>
      </div>
      {/* Canvas */}
      <div style={{flex:1,overflow:"hidden",position:"relative",cursor:panning?"grabbing":"crosshair"}}
        ref={canvasRef}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
        onWheel={onWheel} onClick={onClick}>
        <svg width="100%" height="100%" style={{display:"block",userSelect:"none"}}>
          <defs>
            <pattern id="wm-grid" width={gridSize*zoom} height={gridSize*zoom} patternUnits="userSpaceOnUse"
              patternTransform={`translate(${offset.x%( gridSize*zoom)},${offset.y%(gridSize*zoom)})`}>
              <path d={`M ${gridSize*zoom} 0 L 0 0 0 ${gridSize*zoom}`} fill="none" stroke={gridColor} strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={theme.bg}/>
          <rect width="100%" height="100%" fill="url(#wm-grid)"/>
          <g transform={`translate(${offset.x},${offset.y}) scale(${zoom})`}>
            {/* Pins */}
            {pins.map(pin=>(
              <g key={pin.id} data-pid={pin.id} transform={`translate(${pin.x},${pin.y})`}
                style={{cursor:"pointer"}} onDoubleClick={e=>{e.stopPropagation();startEditPin(pin);}}>
                {/* Pin shadow */}
                <circle cx={0} cy={4} r={10} fill="#0003"/>
                {/* Pin body */}
                <circle cx={0} cy={0} r={10} fill={pin.color||theme.accent} stroke="#fff" strokeWidth={1.5}/>
                <circle cx={0} cy={0} r={4} fill="#fff" opacity={0.7}/>
                {/* Label */}
                {editPin===pin.id ? (
                  <foreignObject x={-60} y={14} width={120} height={50}>
                    <div style={{background:theme.panel,border:`1px solid ${theme.border}`,borderRadius:6,padding:"4px 6px",boxShadow:"0 2px 8px #0003"}}>
                      <input autoFocus value={editVal.name} onChange={e=>setEditVal(v=>({...v,name:e.target.value}))}
                        onBlur={commitEditPin} onKeyDown={e=>{ if(e.key==="Enter"||e.key==="Escape") commitEditPin(); }}
                        style={{width:"100%",border:"none",background:"transparent",fontSize:11,outline:"none",color:theme.ink}}/>
                    </div>
                  </foreignObject>
                ) : (
                  <text x={0} y={-14} textAnchor="middle" fontSize={11} fill={theme.ink}
                    style={{pointerEvents:"none",userSelect:"none",paintOrder:"stroke",stroke:theme.bg,strokeWidth:3}}>
                    {pin.name.length>14?pin.name.slice(0,13)+"…":pin.name}
                  </text>
                )}
              </g>
            ))}
          </g>
        </svg>
        {/* Popup */}
        {popup && (
          <div style={{position:"fixed",left:popup.cx+12,top:popup.cy-20,background:theme.panel,border:`1px solid ${theme.border}`,borderRadius:10,padding:"10px 14px",zIndex:200,boxShadow:"0 4px 16px #0003",minWidth:160}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{popup.pin.name}</div>
            {popup.pin.desc && <div style={{fontSize:11,opacity:.65,marginBottom:8}}>{popup.pin.desc}</div>}
            <div style={{display:"flex",gap:6}}>
              <button className="btn" style={{fontSize:11}} onClick={()=>startEditPin(popup.pin)}>✏️ แก้ไข</button>
              <button className="btn" style={{fontSize:11,color:"#ef4444"}} onClick={()=>deletePin(popup.pin.id)}>🗑 ลบ</button>
              <button className="btn" style={{fontSize:11}} onClick={()=>setPopup(null)}>×</button>
            </div>
          </div>
        )}
        {pins.length===0 && (
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:.3,pointerEvents:"none"}}>
            <div style={{fontSize:48}}>🌐</div>
            <div style={{fontSize:13,marginTop:8}}>คลิกบนแผนที่เพื่อเพิ่ม pin สถานที่</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CORNER ORNAMENTS (SVG) ───────────────────────────────────────────────────
const CORNER_ORNAMENTS = {
  none: null,
  floral: (color, size=28) => `<svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2 Q14 2 14 14 Q2 14 2 2Z" stroke="${color}" strokeWidth="1" fill="none" opacity="0.55"/><circle cx="4" cy="4" r="2" fill="${color}" opacity="0.4"/><path d="M2 10 Q6 6 10 2" stroke="${color}" strokeWidth="0.8" fill="none" opacity="0.4"/></svg>`,
  diamond: (color, size=28) => `<svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="14,2 26,14 14,26 2,14" stroke="${color}" strokeWidth="1" fill="none" opacity="0.35"/><polygon points="14,7 21,14 14,21 7,14" stroke="${color}" strokeWidth="1" fill="none" opacity="0.5"/><circle cx="14" cy="14" r="2" fill="${color}" opacity="0.5"/></svg>`,
  celtic: (color, size=28) => `<svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2 Q10 2 14 10 Q18 2 26 2" stroke="${color}" strokeWidth="1.2" fill="none" opacity="0.55"/><path d="M2 2 Q2 10 10 14 Q2 18 2 26" stroke="${color}" strokeWidth="1.2" fill="none" opacity="0.55"/><circle cx="5" cy="5" r="2" fill="${color}" opacity="0.4"/></svg>`,
  art_deco: (color, size=28) => `<svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="2" y1="2" x2="2" y2="18" stroke="${color}" strokeWidth="1.5" opacity="0.5"/><line x1="2" y1="2" x2="18" y2="2" stroke="${color}" strokeWidth="1.5" opacity="0.5"/><line x1="5" y1="5" x2="5" y2="14" stroke="${color}" strokeWidth="1" opacity="0.35"/><line x1="5" y1="5" x2="14" y2="5" stroke="${color}" strokeWidth="1" opacity="0.35"/><rect x="2" y="2" width="4" height="4" fill="${color}" opacity="0.5"/></svg>`,
};

function renderCornerOrnaments(ornamentId, color) {
  const fn = CORNER_ORNAMENTS[ornamentId];
  if (!fn) return null;
  const transforms = [
    { top:0, left:0,     transform:"none" },
    { top:0, right:0,    transform:"scaleX(-1)" },
    { bottom:0, left:0,  transform:"scaleY(-1)" },
    { bottom:0, right:0, transform:"scale(-1,-1)" },
  ];
  return transforms.map((pos, i) => (
    <div key={i} style={{position:"absolute", ...pos, width:28, height:28, pointerEvents:"none"}}
      dangerouslySetInnerHTML={{__html: fn(color)}} />
  ));
}

// ─── HEADING FRAME STYLES ─────────────────────────────────────────────────────
function getHeadingFrameStyle(frame, accent, border) {
  switch(frame) {
    case "simple":  return { border:`1px solid ${border}`, padding:"12px 20px", borderRadius:0 };
    case "double":  return { border:`3px double ${border}`, padding:"12px 20px", borderRadius:0 };
    case "ornate":  return { border:`1px solid ${accent}`, borderTop:`3px solid ${accent}`, borderBottom:`3px solid ${accent}`, padding:"12px 24px" };
    case "rounded": return { border:`1.5px solid ${border}`, padding:"14px 24px", borderRadius:12 };
    case "shadowed":return { border:`1px solid ${border}`, padding:"14px 24px", borderRadius:8, boxShadow:`0 4px 16px ${accent}22` };
    default: return {};
  }
}

// ─── BOOK PREVIEW PANEL ───────────────────────────────────────────────────────
// แสดง thumbnail ทุกหน้าในหนังสือ: ปกหน้า → สารบัญ → บทๆ → ปกหลัง
// คลิก thumbnail เพื่อ jump ไปบทนั้น
const BookPreviewPanel = memo(function BookPreviewPanel({
  book, chapters, settings, theme, layoutSize, specialPages, calcPageNumbers, onJumpToChapter
}) {
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom]         = useState(0.22);

  // ดึง cover bg จาก settings โดยตรง ไม่พึ่ง COVER_TEMPLATES
  const coverBg = settings.coverImageData
    ? null
    : (settings.coverBg || "#1a1a2e");

  // สร้าง list ของหน้าทั้งหมด — รวมหน้าย่อยต่อบท
  const [expandedChapter, setExpandedChapter] = useState(null); // chapter id ที่ expand ดูหน้าย่อย

  // ประกาศ chWithPages ก่อน pages เพราะ pages ใช้ข้อมูลนี้
  const chWithPages = useMemo(() => {
    try { return calcPageNumbers(); } catch(_) { return []; }
  }, [calcPageNumbers]);

  const pages = useMemo(() => {
    const list = [];
    list.push({ id: "front", type: "cover_front", label: "ปกหน้า" });
    if (book.showTOC !== false) {
      list.push({ id: "toc", type: "toc", label: "สารบัญ" });
    }
    chapters.forEach((ch, i) => {
      // คำนวณจำนวนหน้าของบทนี้ (rough estimate)
      const wordLen = stripHtml(ch.content || "").length;
      const wordsPerPage = 400;
      const numPages = Math.max(1, Math.ceil(wordLen / 5 / wordsPerPage));
      const startPage = chWithPages.find(c => c.id === ch.id)?.page || (i + 3);

      list.push({ id: ch.id, type: "chapter", label: ch.title || `บทที่ ${i + 1}`, ch, idx: i, numPages, startPage });

      // ถ้าบทนี้ถูก expand → เพิ่มหน้าย่อย
      if (expandedChapter === ch.id && numPages > 1) {
        for (let p = 2; p <= numPages; p++) {
          list.push({ id: `${ch.id}-p${p}`, type: "chapter_sub", label: `หน้า ${startPage + p - 1}`, ch, idx: i, subPage: p, startPage });
        }
      }
    });
    list.push({ id: "back", type: "cover_back", label: "ปกหลัง" });
    return list;
  }, [book.showTOC, chapters, chWithPages, expandedChapter]);

  const W = layoutSize.px.w;
  const H = layoutSize.px.h;
  const tw = Math.round(W * zoom);
  const th = Math.round(H * zoom);

  function renderThumbnail(page) {
    const isSelected = selected === page.id;
    const border = isSelected ? `2px solid ${theme.accent}` : `1.5px solid ${theme.border}`;
    const wrap = {
      width: tw, height: th, flexShrink: 0,
      border, borderRadius: 6, overflow: "hidden",
      cursor: "pointer", position: "relative",
      boxShadow: isSelected ? `0 0 0 3px ${theme.accent}33` : "0 2px 8px #0002",
      transition: ".15s", background: theme.bg,
      transform: isSelected ? "translateY(-2px)" : "none",
    };

    if (page.type === "cover_front") {
      const bg = settings.coverImageData
        ? { backgroundImage: `url(${settings.coverImageData})`, backgroundSize: "cover", backgroundPosition: "center" }
        : { background: coverBg || "#1a1a2e" };
      return (
        <div style={{ ...wrap, ...bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8%" }}
          onClick={() => setSelected(page.id)}>
          {settings.coverImageData && <div style={{ position: "absolute", inset: 0, background: `rgba(0,0,0,${(settings.coverOverlay || 30) / 100})` }} />}
          <div style={{ position: "relative", textAlign: "center", zIndex: 1 }}>
            <div style={{ fontSize: tw * 0.09, fontWeight: 800, color: "#fff", lineHeight: 1.2, textShadow: "0 2px 8px #0008", wordBreak: "break-word" }}>
              {book.title || "ชื่อหนังสือ"}
            </div>
            {book.author && <div style={{ fontSize: tw * 0.06, color: "#ffffff99", marginTop: "6%", letterSpacing: ".05em" }}>{book.author}</div>}
          </div>
        </div>
      );
    }

    if (page.type === "cover_back") {
      const bg = settings.backCoverImageData
        ? { backgroundImage: `url(${settings.backCoverImageData})`, backgroundSize: "cover", backgroundPosition: "center" }
        : { background: settings.coverBg || "#111" };
      return (
        <div style={{ ...wrap, ...bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "8%" }}
          onClick={() => setSelected(page.id)}>
          <div style={{ textAlign: "center" }}>
            {settings.backCoverText
              ? <div style={{ fontSize: tw * 0.055, color: "#ffffffbb", lineHeight: 1.5, wordBreak: "break-word" }}>{settings.backCoverText.substring(0, 80)}{settings.backCoverText.length > 80 ? "…" : ""}</div>
              : <div style={{ fontSize: tw * 0.055, color: "#ffffff44", fontStyle: "italic" }}>ปกหลัง</div>}
          </div>
        </div>
      );
    }

    if (page.type === "toc") {
      return (
        <div style={{ ...wrap, padding: `${th * 0.08}px ${tw * 0.09}px`, boxSizing: "border-box" }}
          onClick={() => setSelected(page.id)}>
          <div style={{ fontSize: tw * 0.075, fontWeight: 700, color: theme.accent, marginBottom: th * 0.05, borderBottom: `1px solid ${theme.border}`, paddingBottom: th * 0.03 }}>
            {settings.tocStyle?.headingText || "สารบัญ"}
          </div>
          {chapters.slice(0, 8).map((ch, i) => (
            <div key={ch.id} style={{ display: "flex", justifyContent: "space-between", fontSize: tw * 0.055, color: theme.ink, opacity: 0.75, marginBottom: th * 0.02, overflow: "hidden" }}>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 4 }}>{ch.title || `บทที่ ${i + 1}`}</span>
              <span style={{ opacity: 0.45, flexShrink: 0 }}>{(chWithPages.find(c => c.id === ch.id)?.page) || (i + 3)}</span>
            </div>
          ))}
          {chapters.length > 8 && <div style={{ fontSize: tw * 0.05, opacity: 0.3, marginTop: th * 0.02 }}>+{chapters.length - 8} บท…</div>}
        </div>
      );
    }

    // chapter_sub (หน้าย่อย)
    if (page.type === "chapter_sub") {
      const { ch, subPage, startPage } = page;
      return (
        <div style={{ ...wrap, padding: `${th * 0.07}px ${tw * 0.08}px`, boxSizing: "border-box", opacity: 0.75 }}
          onClick={() => { setSelected(page.id); onJumpToChapter(ch.id); }}>
          <div style={{ fontSize: tw * 0.06, opacity: 0.4, letterSpacing: ".05em", marginBottom: th * 0.03, color: theme.accent }}>
            {ch?.title || `บทที่ ${page.idx + 1}`}
          </div>
          <div style={{ fontSize: tw * 0.055, opacity: 0.3, fontStyle: "italic", marginBottom: th * 0.04 }}>ต่อ…</div>
          <div style={{ position: "absolute", bottom: th * 0.04, right: tw * 0.07, fontSize: tw * 0.05, opacity: 0.35 }}>
            {startPage + subPage - 1}
          </div>
        </div>
      );
    }

    // chapter
    const { ch, idx, numPages } = page;
    const contentText = ch?.content || "";
    const preview  = stripHtml(contentText).substring(0, 300);
    const isExpanded = expandedChapter === ch?.id;
    return (
      <div style={{ ...wrap, padding: `${th * 0.07}px ${tw * 0.08}px`, boxSizing: "border-box" }}
        onClick={() => { setSelected(page.id); onJumpToChapter(page.id); }}>
        <div style={{ fontSize: tw * 0.06, opacity: 0.35, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: th * 0.025 }}>
          บทที่ {idx + 1}
        </div>
        <div style={{ fontSize: tw * 0.075, fontWeight: 700, color: theme.accent, lineHeight: 1.2, marginBottom: th * 0.04, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", wordBreak: "break-word" }}>
          {ch?.title || `บทที่ ${idx + 1}`}
        </div>
        <div style={{ fontSize: tw * 0.055, lineHeight: 1.55, color: theme.ink, opacity: 0.65, overflow: "hidden", wordBreak: "break-word", height: th * 0.5 }}>
          {preview || <span style={{ opacity: 0.3, fontStyle: "italic" }}>ยังไม่มีเนื้อหา…</span>}
        </div>
        {/* หน้าย่อย expand button */}
        {numPages > 1 && (
          <div onClick={e=>{ e.stopPropagation(); setExpandedChapter(isExpanded ? null : ch.id); }}
            style={{ position:"absolute", bottom: th*0.04, left: tw*0.07, fontSize: tw*0.047, opacity:0.5, cursor:"pointer", color: theme.accent, userSelect:"none" }}>
            {isExpanded ? `▲ ซ่อน` : `▼ ${numPages} หน้า`}
          </div>
        )}
        <div style={{ position: "absolute", bottom: th * 0.04, right: tw * 0.07, fontSize: tw * 0.05, opacity: 0.25 }}>
          {chWithPages.find(c => c.id === ch?.id)?.page || idx + 3}
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: theme.bg }}>
      {/* Header toolbar */}
      <div style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${theme.border}`, flexShrink: 0, background: theme.panel }}>
        <span style={{ fontWeight: 700, fontSize: 13 }}>👁 Preview</span>
        <span style={{ fontSize: 11, opacity: 0.45 }}>{pages.length} หน้า</span>
        <div style={{ flex: 1 }} />
        {/* Zoom control */}
        <span style={{ fontSize: 11, opacity: 0.5 }}>ขนาด</span>
        <input type="range" min={0.12} max={0.38} step={0.02} value={zoom}
          onChange={e => setZoom(parseFloat(e.target.value))}
          style={{ width: 80, accentColor: theme.accent }} />
        <span style={{ fontSize: 11, opacity: 0.5, minWidth: 32 }}>{Math.round(zoom * 100)}%</span>
      </div>

      {/* Thumbnail grid */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
          {pages.map(page => (
            <div key={page.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              {renderThumbnail(page)}
              <div style={{ fontSize: 10, opacity: 0.45, maxWidth: tw, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {page.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel — แสดงเมื่อเลือกหน้า */}
      {selected && (() => {
        const page = pages.find(p => p.id === selected);
        if (!page) return null;
        return (
          <div style={{ padding: "12px 20px", borderTop: `1px solid ${theme.border}`, background: theme.panel, flexShrink: 0, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, fontSize: 12 }}>
              <span style={{ fontWeight: 700, color: theme.accent }}>{page.label}</span>
              {page.type === "chapter" && (
                <span style={{ marginLeft: 8, opacity: 0.5 }}>
                  {page.ch?.content ? `${Math.round(stripHtml(page.ch.content).length / 5)} คำ (ประมาณ)` : "ว่างเปล่า"}
                </span>
              )}
            </div>
            {page.type === "chapter" && (
              <button className="accent-btn" style={{ fontSize: 12, padding: "5px 14px" }}
                onClick={() => onJumpToChapter(page.id)}>
                ✏️ ไปเขียนบทนี้
              </button>
            )}
            <button style={{ fontSize: 11, padding: "4px 10px", border: `1px solid ${theme.border}`, borderRadius: 6, background: "transparent", color: theme.ink, cursor: "pointer", opacity: 0.6 }}
              onClick={() => setSelected(null)}>
              ✕
            </button>
          </div>
        );
      })()}
    </div>
  );
});

// ─── TOC PAGE RENDERER ────────────────────────────────────────────────────────
function TOCPageRenderer({ chapters, book, settings, theme, style = {} }) {
  const ts = { ...(settings.tocStyle || {}) };
  const decor = ts.decor || {};
  const tpl = TOC_TEMPLATES.find(t => t.id === ts.template) || TOC_TEMPLATES[0];
  const merged = { ...tpl.style, ...ts };

  const headingText    = merged.headingText    || "สารบัญ";
  const subheadingText = merged.subheadingText || "Table of Contents";
  const showSub        = merged.showSubtitle   !== false;
  const headingAlign   = merged.headingAlign   || "center";
  const showPgNum      = merged.showPageNumbers !== false;
  const leaderChar     = merged.leaderChar     || "dots";
  const leaderCustom   = merged.leaderCustom   || "·";
  const headingSize    = merged.headingSize    || 18;
  const fontSize       = merged.fontSize       || (settings.fontSize ? settings.fontSize * 0.93 : 14);
  const rowSpacing     = merged.rowSpacing     || 10;
  const boxedNumbers   = merged.boxedNumbers   || false;
  const borderBottom   = merged.showBorderBottom !== false;

  const pgNumColor = merged.pageNumColor === "accent" ? theme.accent
    : merged.pageNumColor === "muted" ? `${theme.ink}55`
    : theme.ink;

  function getLeader() {
    if (leaderChar === "dots")   return { char: "·", repeat: 28 };
    if (leaderChar === "dashes") return { char: "—", repeat: 14 };
    if (leaderChar === "line")   return { char: "─", repeat: 22 };
    if (leaderChar === "space")  return { char: " ", repeat: 1 };
    return { char: leaderCustom, repeat: 20 };
  }
  const leader = getLeader();

  // Heading background
  let headingBgStyle = {};
  if (decor.headingBg === "solid")    headingBgStyle = { background: decor.headingBgColor || "#f5ede0" };
  if (decor.headingBg === "gradient") headingBgStyle = { background: decor.headingBgGradient || `linear-gradient(135deg,${theme.accent}22,transparent)` };
  if (decor.headingBg === "image" && decor.headingBgImage) {
    headingBgStyle = { backgroundImage:`url(${decor.headingBgImage})`, backgroundSize:"cover", backgroundPosition:"center" };
  }

  const headingFrameStyle = getHeadingFrameStyle(decor.headingFrame, theme.accent, theme.border);
  const hasFrameOrBg = decor.headingFrame !== "none" || decor.headingBg !== "none";

  // Page border
  const pb = settings.pageBorder || {};
  const pageBorderColor = pb.color === "accent" ? theme.accent : pb.color === "muted" ? `${theme.ink}44` : pb.color === "custom" ? pb.customColor : theme.ink;
  let pageBorderCss = {};
  if (pb.enabled) {
    const w = pb.width || 1;
    const inset = pb.inset || 8;
    const r = pb.radius || 0;
    if (pb.style === "double") {
      pageBorderCss = { outline:`${w}px solid ${pageBorderColor}`, outlineOffset:`-${inset}px`, borderRadius:r,
        boxShadow:`inset 0 0 0 ${inset + w + 3}px ${pageBorderColor}` };
    } else if (pb.style === "dashed") {
      pageBorderCss = { outline:`${w}px dashed ${pageBorderColor}`, outlineOffset:`-${inset}px`, borderRadius:r };
    } else if (pb.style === "shadow") {
      // Use outline + filter drop-shadow so it doesn't conflict with page's own box-shadow
      pageBorderCss = { outline:`${w}px solid ${pageBorderColor}55`, outlineOffset:`-${inset}px`, borderRadius:r,
        filter:`drop-shadow(0 0 ${w * 4}px ${pageBorderColor}88)` };
    } else {
      pageBorderCss = { outline:`${w}px solid ${pageBorderColor}`, outlineOffset:`-${inset}px`, borderRadius:r };
    }
  }

  return (
    <div className="page-for-export" style={{marginBottom:24, position:"relative", ...pageBorderCss, ...style}}>
      {/* Corner ornaments on TOC page */}
      {decor.cornerOrnament && decor.cornerOrnament !== "none" && renderCornerOrnaments(decor.cornerOrnament, theme.accent)}

      {/* Heading */}
      <div style={{
        textAlign:headingAlign, marginBottom:24,
        paddingBottom: hasFrameOrBg ? 0 : 14,
        borderBottom: (borderBottom && !hasFrameOrBg) ? `1px solid ${theme.border}` : "none",
        position:"relative",
      }}>
        <div style={{
          display:"inline-block", width: hasFrameOrBg ? "100%" : "auto",
          position:"relative", overflow:"hidden",
          ...headingBgStyle, ...headingFrameStyle,
        }}>
          {showSub && <div style={{fontSize:10, letterSpacing:".2em", textTransform:"uppercase", opacity:.4, marginBottom:6}}>{headingText}</div>}
          <div style={{fontSize:headingSize, fontWeight:700, color:theme.accent, fontFamily:`'${settings.font}',sans-serif`, position:"relative", zIndex:1}}>
            {showSub ? subheadingText : headingText}
          </div>
          {/* Overlay for bg image */}
          {decor.headingBg === "image" && decor.headingBgImage && (
            <div style={{position:"absolute",inset:0,background:`rgba(${theme.bg==="dark"?"0,0,0":"255,255,255"},0.4)`,pointerEvents:"none"}}/>
          )}
        </div>
        {hasFrameOrBg && borderBottom && <div style={{height:1,background:theme.border,marginTop:16,opacity:.5}}/>}
      </div>

      {/* Entries */}
      <div style={{fontFamily:`'${settings.font}',sans-serif`}}>
        {chapters.map((ch, i) => (
          <div key={ch.id || i} style={{
            display:"flex", alignItems:"baseline", gap:6,
            marginBottom:rowSpacing,
            paddingBottom: borderBottom ? 6 : 4,
            borderBottom: borderBottom ? `1px dotted ${theme.border}44` : "none",
            fontSize,
          }}>
            {boxedNumbers && (
              <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:22,height:22,borderRadius:4,background:theme.accent,color:"#fff",fontSize:10,fontWeight:700,flexShrink:0,marginRight:6}}>
                {String(i+1).padStart(2,"0")}
              </span>
            )}
            <span style={{flex:1, fontWeight:500, lineHeight:1.4}}>{ch.title}</span>
            {showPgNum && leaderChar !== "space" && (
              <span style={{opacity:.3, fontSize:10, overflow:"hidden", whiteSpace:"nowrap", flexShrink:0, maxWidth:80}}>
                {leader.char.repeat(leader.repeat)}
              </span>
            )}
            {showPgNum && (
              <span style={{fontWeight:700, color:pgNumColor, minWidth:24, textAlign:"right", fontSize:fontSize*0.88, flexShrink:0}}>
                {ch.pageNum}
              </span>
            )}
          </div>
        ))}
      </div>

      <div style={{textAlign:"center", paddingTop:16, marginTop:16, borderTop:`1px solid ${theme.border}33`, fontSize:10, opacity:.3}}>
        {book?.title || ""}
      </div>
    </div>
  );
}

// ─── TOC STYLE PANEL ─────────────────────────────────────────────────────────
const TOCStylePanel = memo(function TOCStylePanel({ settings, setSetting, theme, previewChapters }) {
  const ts = settings.tocStyle || {};
  function set(key, val) {
    setSetting("tocStyle", { ...ts, [key]: val });
  }
  function applyTemplate(tpl) {
    setSetting("tocStyle", { ...ts, ...tpl.style, template: tpl.id });
  }

  const currentTpl = ts.template || "classic";

  const sliderStyle = { flex:1, accentColor:theme.accent, cursor:"pointer" };
  const labelStyle  = { fontSize:10, opacity:.55, display:"block", marginBottom:3 };
  const inputStyle  = { width:"100%", padding:"6px 9px", background:`${theme.border}33`, border:`1px solid ${theme.border}`, borderRadius:7, fontSize:12, color:theme.ink, outline:"none", boxSizing:"border-box" };

  const previewBook = { title: settings?.bookTitle || "" };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:0}}>

      {/* Template Picker */}
      <div className="sec-head">เลือก Template สารบัญ</div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
        {TOC_TEMPLATES.map(tpl => (
          <button key={tpl.id} onClick={()=>applyTemplate(tpl)}
            style={{
              padding:"9px 12px", borderRadius:10, textAlign:"left", cursor:"pointer", transition:".15s",
              border:`1.5px solid ${currentTpl===tpl.id ? theme.accent : theme.border}`,
              background: currentTpl===tpl.id ? `${theme.accent}18` : `${theme.border}18`,
              outline:"none",
            }}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
              <div style={{fontWeight:currentTpl===tpl.id?700:500, fontSize:12, color:currentTpl===tpl.id?theme.accent:theme.ink}}>{tpl.label}</div>
              <span style={{fontSize:10, opacity:.45, fontFamily:"monospace"}}>{tpl.preview}</span>
            </div>
            <div style={{fontSize:10,opacity:.5,marginTop:2,lineHeight:1.4}}>{tpl.desc}</div>
          </button>
        ))}
      </div>

      {/* Heading settings */}
      <div className="sec-head">หัวสารบัญ</div>
      <div style={{marginBottom:10}}>
        <label style={labelStyle}>ข้อความหลัก</label>
        <input value={ts.headingText||"สารบัญ"} onChange={e=>set("headingText",e.target.value)} style={inputStyle}/>
      </div>
      <div style={{marginBottom:10}}>
        <label style={labelStyle}>ข้อความรอง (Table of Contents)</label>
        <input value={ts.subheadingText||"Table of Contents"} onChange={e=>set("subheadingText",e.target.value)} style={inputStyle}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        <div>
          <label style={labelStyle}>ตำแหน่งหัว</label>
          <select value={ts.headingAlign||"center"} onChange={e=>set("headingAlign",e.target.value)} style={{...inputStyle,cursor:"pointer"}}>
            <option value="left">ชิดซ้าย</option>
            <option value="center">กึ่งกลาง</option>
            <option value="right">ชิดขวา</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>ขนาดหัว ({ts.headingSize||18}px)</label>
          <input type="range" min={14} max={32} value={ts.headingSize||18} onChange={e=>set("headingSize",Number(e.target.value))} style={sliderStyle}/>
        </div>
      </div>

      {/* Entry settings */}
      <div className="sec-head">รายการบท</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        <div>
          <label style={labelStyle}>ขนาดฟอนต์ ({ts.fontSize||14}px)</label>
          <input type="range" min={10} max={20} value={ts.fontSize||14} onChange={e=>set("fontSize",Number(e.target.value))} style={sliderStyle}/>
        </div>
        <div>
          <label style={labelStyle}>ช่องว่างแถว ({ts.rowSpacing||10}px)</label>
          <input type="range" min={4} max={24} value={ts.rowSpacing||10} onChange={e=>set("rowSpacing",Number(e.target.value))} style={sliderStyle}/>
        </div>
      </div>

      {/* Leader char */}
      <div style={{marginBottom:10}}>
        <label style={labelStyle}>ตัวคั่น (Leader)</label>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          {[
            {id:"dots",   label:"Dots ·····"},
            {id:"dashes", label:"Dashes ———"},
            {id:"line",   label:"Line ──────"},
            {id:"space",  label:"Space"},
            {id:"custom", label:"Custom"},
          ].map(opt => (
            <button key={opt.id} onClick={()=>set("leaderChar",opt.id)}
              style={{padding:"3px 10px", borderRadius:20, border:`1px solid ${(ts.leaderChar||"dots")===opt.id?theme.accent:theme.border}`, background:(ts.leaderChar||"dots")===opt.id?theme.accent:"transparent", color:(ts.leaderChar||"dots")===opt.id?"#fff":theme.ink, fontSize:10, cursor:"pointer", fontFamily:"monospace"}}>
              {opt.label}
            </button>
          ))}
        </div>
        {ts.leaderChar === "custom" && (
          <input value={ts.leaderCustom||"·"} onChange={e=>set("leaderCustom",e.target.value)} placeholder="อักขระ เช่น · ✦ —" style={{...inputStyle,marginTop:6,width:120}} maxLength={4}/>
        )}
      </div>

      {/* Page number color */}
      <div style={{marginBottom:10}}>
        <label style={labelStyle}>สีเลขหน้า</label>
        <div style={{display:"flex",gap:5}}>
          {[{id:"accent",label:"Accent"},{id:"ink",label:"Normal"},{id:"muted",label:"Muted"}].map(c=>(
            <button key={c.id} onClick={()=>set("pageNumColor",c.id)}
              style={{flex:1,padding:"4px",borderRadius:8,border:`1px solid ${(ts.pageNumColor||"accent")===c.id?theme.accent:theme.border}`,background:(ts.pageNumColor||"accent")===c.id?`${theme.accent}22`:"transparent",color:(ts.pageNumColor||"accent")===c.id?theme.accent:theme.ink,fontSize:11,cursor:"pointer",fontWeight:(ts.pageNumColor||"accent")===c.id?700:400}}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="sec-head">ตัวเลือกอื่นๆ</div>
      {[
        {key:"showPageNumbers", label:"แสดงเลขหน้า", def:true},
        {key:"showSubtitle",    label:"แสดง Subtitle", def:true},
        {key:"showBorderBottom",label:"เส้น Separator", def:true},
        {key:"boxedNumbers",    label:"กล่องเลขบท [01]", def:false},
      ].map(({key,label,def}) => (
        <div key={key} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 10px",background:`${theme.border}18`,borderRadius:8,marginBottom:5}}>
          <span style={{fontSize:12,opacity:.7}}>{label}</span>
          <button onClick={()=>set(key, ts[key]===undefined ? !def : !ts[key])}
            style={{padding:"3px 12px",borderRadius:20,border:"none",fontSize:11,fontWeight:600,cursor:"pointer",
              background:(ts[key]===undefined?def:ts[key]) ? theme.accent : `${theme.border}44`,
              color:(ts[key]===undefined?def:ts[key]) ? "#fff" : theme.ink,
              transition:".15s"}}>
            {(ts[key]===undefined?def:ts[key]) ? "เปิด" : "ปิด"}
          </button>
        </div>
      ))}

      {/* Live Preview */}
      <div className="sec-head" style={{marginTop:14}}>Preview สารบัญ</div>
      <div style={{background:`${theme.border}18`,borderRadius:12,padding:"12px 10px",overflow:"hidden",fontSize:11}}>
        {previewChapters.length === 0 ? (
          <div style={{opacity:.35,textAlign:"center",padding:12}}>ยังไม่มีบท</div>
        ) : (
          <div style={{transform:"scale(0.72)",transformOrigin:"top left",width:"138%",pointerEvents:"none"}}>
            <TOCPageRenderer
              chapters={previewChapters.slice(0,6)}
              book={previewBook}
              settings={settings}
              theme={theme}
            />
          </div>
        )}
      </div>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 QUICK STYLE PANEL — floating draggable panel (ขวามือ)
// ควบคุม สี / ขนาดฟอนต์ / margin ได้ทันทีโดยไม่ต้องเปิด right panel
// ═══════════════════════════════════════════════════════════════════════════════
const _QS_SWATCHES = [
  "#1a1612","#2a1f0f","#ffffff","#f5ede0","#fffef9",
  "#8b4513","#c4773a","#4a90d9","#2d7a4f","#9b59b6",
  "#e74c3c","#e67e22","#1abc9c","#6c5ce7","#fd79a8",
];

function _QColorDot({ color, active, onClick, border }) {
  return (
    <button onClick={onClick} title={color||"Auto"} style={{
      width:18, height:18, borderRadius:4, flexShrink:0, cursor:"pointer",
      background: color||"transparent",
      border: active ? `2.5px solid #fff` : `1.5px solid ${border}`,
      boxShadow: active ? `0 0 0 2px #0006` : "none",
      outline:"none", transition:".1s",
      ...(color ? {} : { backgroundImage:"repeating-linear-gradient(45deg,#ccc 0,#ccc 2px,transparent 2px,transparent 6px)", opacity:.7 }),
    }}/>
  );
}

const QuickStylePanel = memo(function QuickStylePanel({ settings, setSetting, theme, visible, onClose }) {
  const [pos, setPos]         = useState({ x: null, y: 80 });  // null x = auto right
  const [dragging, setDragging] = useState(false);
  const dragOff = useRef({ dx:0, dy:0 });
  const panelRef = useRef(null);
  const [activeSlot, setActiveSlot] = useState("bodyText");
  const [hexVal, setHexVal]   = useState("");
  const [hexOpen, setHexOpen] = useState(false);

  const cp    = settings.colorPalette || {};
  const ink   = theme.ink;
  const bg    = theme.panel;
  const bdr   = theme.border;
  const acc   = theme.accent;

  // Derive right-edge position default
  const panelW = 228;
  const defaultX = typeof window !== "undefined" ? window.innerWidth - panelW - 12 : 900;
  const px = pos.x ?? defaultX;

  // Click-outside → ปิด (ยกเว้นกำลัง drag)
  useEffect(() => {
    if (!visible) return;
    function handle(e) {
      if (dragging) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    }
    function handleKey(e) { if (e.key === "Escape") onClose(); }
    // mousedown ใช้ capture เพื่อ intercept ก่อน element อื่น
    document.addEventListener("mousedown", handle, true);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handle, true);
      document.removeEventListener("keydown", handleKey);
    };
  }, [visible, dragging, onClose]);

  // Drag handlers
  function onMouseDown(e) {
    if (e.target.closest("input,button,select")) return;
    setDragging(true);
    dragOff.current = { dx: e.clientX - px, dy: e.clientY - pos.y };
    e.preventDefault();
  }
  useEffect(() => {
    if (!dragging) return;
    function onMove(e) {
      const nx = Math.max(0, Math.min(window.innerWidth - panelW - 4, e.clientX - dragOff.current.dx));
      const ny = Math.max(0, Math.min(window.innerHeight - 80, e.clientY - dragOff.current.dy));
      setPos({ x: nx, y: ny });
    }
    function onUp() { setDragging(false); }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [dragging]);

  if (!visible) return null;

  const SLOTS = [
    { id:"bodyText",    label:"เนื้อหา",   emoji:"✍" },
    { id:"headingText", label:"หัวบท",     emoji:"H" },
    { id:"accentColor", label:"Accent",    emoji:"◆" },
    { id:"bgPage",      label:"พื้นหลัง",  emoji:"□" },
    { id:"dividerColor",label:"Divider",   emoji:"—" },
  ];
  const curColor = cp[activeSlot] || "";

  function setColor(c) {
    setSetting("colorPalette", { ...cp, [activeSlot]: c });
    setHexVal(c);
  }

  function handleHexCommit() {
    const c = hexVal.trim();
    if (!c) { setColor(""); return; }
    if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(c)) setColor(c);
  }

  return (
    <div ref={panelRef}
      style={{
        position:"fixed", left: px, top: pos.y, width: panelW, zIndex: 1200,
        background: bg, border:`1px solid ${bdr}`,
        borderRadius:14, boxShadow:"0 8px 32px #0004",
        userSelect:"none", fontFamily:"inherit", color: ink,
        transition: dragging ? "none" : "box-shadow .2s",
      }}>

      {/* ── Header / drag handle ── */}
      <div onMouseDown={onMouseDown} style={{
        padding:"8px 10px 6px", borderBottom:`1px solid ${bdr}`,
        display:"flex", alignItems:"center", gap:6, cursor: dragging ? "grabbing" : "grab",
        borderRadius:"13px 13px 0 0",
        background:`${acc}18`,
      }}>
        <span style={{fontSize:13}}>🎨</span>
        <span style={{flex:1, fontSize:11, fontWeight:700, opacity:.85}}>Quick Style</span>
        <button onClick={onClose} style={{
          width:18,height:18,borderRadius:4,border:`1px solid ${bdr}`,
          background:"transparent",color:ink,fontSize:11,cursor:"pointer",
          display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1,
          opacity:.6,
        }}>×</button>
      </div>

      <div style={{padding:"10px 10px 12px", display:"flex", flexDirection:"column", gap:10}}>

        {/* ── ขนาดฟอนต์ ── */}
        <div>
          <div style={{fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:".1em",opacity:.45,marginBottom:5}}>ขนาดตัวอักษร</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <button onClick={()=>setSetting("fontSize",Math.max(10,(settings.fontSize||15)-1))}
              style={{width:22,height:22,borderRadius:5,border:`1px solid ${bdr}`,background:"transparent",color:ink,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,lineHeight:1}}>−</button>
            <input type="range" min={10} max={72} step={1} value={settings.fontSize||15}
              onChange={e=>setSetting("fontSize",Number(e.target.value))}
              style={{flex:1,accentColor:acc,cursor:"pointer",height:4}}/>
            <button onClick={()=>setSetting("fontSize",Math.min(72,(settings.fontSize||15)+1))}
              style={{width:22,height:22,borderRadius:5,border:`1px solid ${bdr}`,background:"transparent",color:ink,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,lineHeight:1}}>+</button>
            <span style={{fontSize:11,width:28,textAlign:"right",color:acc,fontWeight:700,fontVariantNumeric:"tabular-nums",flexShrink:0}}>{settings.fontSize||15}</span>
          </div>
        </div>

        {/* ── Margin ── */}
        <div>
          <div style={{fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:".1em",opacity:.45,marginBottom:5}}>Margin ซ้าย/ขวา</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <input type="range" min={20} max={100} step={2} value={settings.marginH||52}
              onChange={e=>setSetting("marginH",Number(e.target.value))}
              style={{flex:1,accentColor:acc,cursor:"pointer"}}/>
            <span style={{fontSize:11,width:32,textAlign:"right",color:acc,fontWeight:700,fontVariantNumeric:"tabular-nums",flexShrink:0}}>{settings.marginH||52}px</span>
          </div>
          <div style={{fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:".1em",opacity:.45,marginBottom:5,marginTop:7}}>Margin บน/ล่าง</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <input type="range" min={20} max={100} step={2} value={settings.marginV||56}
              onChange={e=>setSetting("marginV",Number(e.target.value))}
              style={{flex:1,accentColor:acc,cursor:"pointer"}}/>
            <span style={{fontSize:11,width:32,textAlign:"right",color:acc,fontWeight:700,fontVariantNumeric:"tabular-nums",flexShrink:0}}>{settings.marginV||56}px</span>
          </div>
        </div>

        {/* ── สี ── */}
        <div>
          <div style={{fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:".1em",opacity:.45,marginBottom:6}}>สี</div>

          {/* Slot selector */}
          <div style={{display:"flex",gap:3,marginBottom:7,flexWrap:"wrap"}}>
            {SLOTS.map(s=>(
              <button key={s.id} onClick={()=>{ setActiveSlot(s.id); setHexVal(cp[s.id]||""); setHexOpen(false); }}
                title={s.label}
                style={{
                  padding:"3px 6px",borderRadius:5,border:`1.5px solid ${activeSlot===s.id?acc:bdr}`,
                  background: activeSlot===s.id?`${acc}22`:"transparent",
                  cursor:"pointer",fontSize:9,fontWeight:activeSlot===s.id?700:400,
                  color:activeSlot===s.id?acc:ink,transition:".1s",
                  display:"flex",alignItems:"center",gap:3,
                }}>
                <div style={{
                  width:8,height:8,borderRadius:2,flexShrink:0,
                  background:cp[s.id]||"transparent",
                  border:`1px solid ${bdr}`,
                  ...(cp[s.id]?{}:{backgroundImage:"repeating-linear-gradient(45deg,#ccc 0,#ccc 1px,transparent 1px,transparent 4px)"}),
                }}/>
                {s.emoji}
              </button>
            ))}
          </div>

          {/* Current color preview row */}
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <div style={{
              width:24,height:24,borderRadius:5,flexShrink:0,
              background:curColor||"transparent",border:`1.5px solid ${bdr}`,
              cursor:"pointer",
              ...(curColor?{}:{backgroundImage:"repeating-linear-gradient(45deg,#ccc 0,#ccc 2px,transparent 2px,transparent 6px)"}),
            }} onClick={()=>setHexOpen(v=>!v)}/>
            <span style={{flex:1,fontSize:10,opacity:.7}}>{SLOTS.find(s=>s.id===activeSlot)?.label}</span>
            {curColor && (
              <button onClick={()=>setColor("")} style={{fontSize:9,padding:"2px 5px",border:`1px solid #ef444444`,borderRadius:4,background:"transparent",color:"#ef4444",cursor:"pointer"}}>Auto</button>
            )}
          </div>

          {/* Swatches */}
          <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:6}}>
            <_QColorDot color="" active={!curColor} onClick={()=>setColor("")} border={bdr}/>
            {_QS_SWATCHES.map(c=>(
              <_QColorDot key={c} color={c} active={curColor===c} onClick={()=>setColor(c)} border={bdr}/>
            ))}
          </div>

          {/* Hex + color picker */}
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <input type="color" value={curColor||"#000000"}
              onChange={e=>{ setColor(e.target.value); setHexVal(e.target.value); }}
              style={{width:24,height:24,borderRadius:4,border:"none",cursor:"pointer",padding:0,background:"transparent",flexShrink:0}}/>
            <input type="text" value={hexVal}
              onChange={e=>setHexVal(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter")handleHexCommit();}}
              onBlur={handleHexCommit}
              placeholder="#rrggbb"
              style={{flex:1,padding:"3px 7px",border:`1px solid ${bdr}`,borderRadius:5,fontSize:10,background:theme.bg,color:ink,outline:"none",fontFamily:"monospace"}}/>
          </div>
        </div>

        {/* ── Line Height ── */}
        <div>
          <div style={{fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:".1em",opacity:.45,marginBottom:5}}>Line Height</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <input type="range" min={120} max={260} step={5}
              value={(settings.paragraphFormat||{}).lineHeight||185}
              onChange={e=>setSetting("paragraphFormat",{...(settings.paragraphFormat||{}),lineHeight:Number(e.target.value)})}
              style={{flex:1,accentColor:acc,cursor:"pointer"}}/>
            <span style={{fontSize:11,width:36,textAlign:"right",color:acc,fontWeight:700,fontVariantNumeric:"tabular-nums",flexShrink:0}}>{(settings.paragraphFormat||{}).lineHeight||185}%</span>
          </div>
        </div>

      </div>
    </div>
  );
});

// ─── SCENE DIVIDER RENDERER ────────────────────────────────────────────────────
// Used both in editor preview and in export HTML
function SceneDividerRenderer({ settings, theme, style = {} }) {
  const decor = settings.dividerDecor || { type: "text" };
  const dividerText = settings.divider || "◆◆◆";
  const color = settings.colorPalette?.dividerColor || theme?.ink || "#1a1612";

  if (decor.type === "image" && decor.imgUrl) {
    return (
      <div style={{ textAlign: "center", margin: "24px 0", ...style }}>
        <div style={{
          width: "100%", height: 64,
          backgroundImage: `url(${decor.imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.55,
          borderRadius: 6,
        }} />
        {decor.imgCredit && (
          <div style={{ fontSize: 9, opacity: 0.35, marginTop: 3 }}>
            Photo: {decor.imgCredit} / Pexels
          </div>
        )}
      </div>
    );
  }

  if (decor.type === "svg" && decor.svgId) {
    const orn = SVG_ORNAMENTS.find(o => o.id === decor.svgId);
    if (orn) {
      return (
        <div style={{ textAlign: "center", margin: "20px 0", color, ...style }}
          dangerouslySetInnerHTML={{ __html: orn.svg.replace(/currentColor/g, color) }} />
      );
    }
  }

  // default: text divider
  return (
    <div style={{ textAlign: "center", margin: "20px 0", letterSpacing: "6px", opacity: 0.4, fontSize: 16, ...style }}>
      {dividerText}
    </div>
  );
}

// ─── SCENE DIVIDER DECORATION PANEL ───────────────────────────────────────────
const SceneDividerDecorPanel = memo(function SceneDividerDecorPanel({ settings, setSetting, theme, showToast, DIVIDERS }) {
  const [pexelsKey, setPexelsKeyLocal] = useState(settings.pexelsKey || "");
  const [pexelsQuery, setPexelsQuery] = useState("texture pattern paper");
  const [pexelsResults, setPexelsResults] = useState([]);
  const [pexelsLoading, setPexelsLoading] = useState(false);
  const [pexelsError, setPexelsError] = useState("");
  const [activeTab, setActiveTab] = useState(
    settings.dividerDecor?.type === "image" ? "image"
      : settings.dividerDecor?.type === "svg" ? "svg" : "text"
  );

  const decor = settings.dividerDecor || { type: "text" };

  function setDecor(patch) {
    setSetting("dividerDecor", { ...decor, ...patch });
  }

  async function searchPexels() {
    const key = pexelsKey.trim();
    if (!key) { setPexelsError("กรุณาใส่ Pexels API Key ก่อน"); return; }
    if (!pexelsQuery.trim()) { setPexelsError("กรุณาใส่คำค้นหา"); return; }
    setPexelsLoading(true);
    setPexelsError("");
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(pexelsQuery)}&per_page=12&orientation=landscape`,
        { headers: { Authorization: key } }
      );
      if (!res.ok) {
        const msg = res.status === 401 ? "API Key ไม่ถูกต้อง" : `Error ${res.status}`;
        setPexelsError(msg); return;
      }
      const data = await res.json();
      setPexelsResults(data.photos || []);
      setSetting("pexelsKey", key);
      if ((data.photos || []).length === 0) setPexelsError("ไม่พบภาพ ลองคำค้นหาอื่น");
    } catch(e) {
      setPexelsError("ไม่สามารถเชื่อมต่อ Pexels ได้");
    } finally {
      setPexelsLoading(false);
    }
  }

  const tabStyle = (id) => ({
    padding: "5px 12px", border: "none", borderRadius: 20,
    fontSize: 11, fontWeight: 600, cursor: "pointer",
    background: activeTab === id ? theme.accent : `${theme.border}44`,
    color: activeTab === id ? "#fff" : theme.ink,
    transition: ".15s",
  });

  return (
    <div>
      {/* Toggle เส้นหัวบท */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",background:`${theme.border}22`,borderRadius:10,marginBottom:14}}>
        <span style={{fontSize:12,opacity:.7}}>เส้นใต้หัวบท</span>
        <button
          onClick={()=>setSetting("showChapterLine", settings.showChapterLine===false ? true : false)}
          style={{padding:"4px 14px",borderRadius:20,border:"none",fontSize:11,fontWeight:600,cursor:"pointer",
            background: settings.showChapterLine===false ? `${theme.border}44` : theme.accent,
            color: settings.showChapterLine===false ? theme.ink : "#fff",
            transition:".15s"}}>
          {settings.showChapterLine===false ? "ปิดอยู่" : "เปิดอยู่"}
        </button>
      </div>

      <div className="sec-head">ตัวคั่นบท (ข้อความ)</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {DIVIDERS.map(d => (
          <button key={d}
            className={"divider-btn" + (settings.divider === d && decor.type === "text" ? " active" : "")}
            onClick={() => { setSetting("divider", d); setDecor({ type: "text" }); setActiveTab("text"); }}>
            {d}
          </button>
        ))}
      </div>

      <div className="sec-head">ของตกแต่งฉากคั่นบท</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        <button style={tabStyle("text")} onClick={() => { setActiveTab("text"); setDecor({ type: "text" }); }}>✦ ข้อความ</button>
        <button style={tabStyle("svg")} onClick={() => setActiveTab("svg")}>🎨 ลวดลาย SVG</button>
        <button style={tabStyle("image")} onClick={() => setActiveTab("image")}>🖼 Pexels</button>
      </div>

      {/* ── TEXT TAB ── */}
      {activeTab === "text" && (
        <div style={{ padding: "10px 12px", background: `${theme.border}22`, borderRadius: 10, textAlign: "center", fontSize: 16, letterSpacing: "4px", opacity: 0.55 }}>
          {settings.divider || "◆◆◆"}
        </div>
      )}

      {/* ── SVG ORNAMENTS TAB ── */}
      {activeTab === "svg" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {SVG_ORNAMENTS.map(orn => (
              <button key={orn.id}
                onClick={() => setDecor({ type: "svg", svgId: orn.id })}
                style={{
                  padding: "10px 8px", border: `1.5px solid ${decor.type === "svg" && decor.svgId === orn.id ? theme.accent : theme.border}`,
                  borderRadius: 10, background: decor.type === "svg" && decor.svgId === orn.id ? `${theme.accent}15` : `${theme.border}22`,
                  cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                  transition: ".15s",
                }}>
                <div style={{ color: theme.ink, width: "100%" }}
                  dangerouslySetInnerHTML={{ __html: orn.svg.replace(/currentColor/g, theme.ink) }} />
                <span style={{ fontSize: 10, opacity: .6 }}>{orn.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── PEXELS IMAGE TAB ── */}
      {activeTab === "image" && (
        <div>
          {/* ── Preset images (no key needed) ── */}
          <div style={{marginBottom:12}}>
            {[
              { cat:"🌸 ดอกไม้ / ธรรมชาติ", photos:[
                { id:"p1", tiny:"https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Pixabay" },
                { id:"p2", tiny:"https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Pixabay" },
                { id:"p3", tiny:"https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&h=60&w=100&fp-y=0.3", url:"https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Irina Iriser" },
                { id:"p4", tiny:"https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Photo Mix" },
              ]},
              { cat:"📜 กระดาษ / Texture", photos:[
                { id:"t1", tiny:"https://images.pexels.com/photos/7092326/pexels-photo-7092326.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/7092326/pexels-photo-7092326.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Monstera" },
                { id:"t2", tiny:"https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Pixabay" },
                { id:"t3", tiny:"https://images.pexels.com/photos/172276/pexels-photo-172276.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/172276/pexels-photo-172276.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Pixabay" },
                { id:"t4", tiny:"https://images.pexels.com/photos/1070534/pexels-photo-1070534.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/1070534/pexels-photo-1070534.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Scott Webb" },
              ]},
              { cat:"🌌 มืด / อวกาศ / ลึกลับ", photos:[
                { id:"d1", tiny:"https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Felix Mittermeier" },
                { id:"d2", tiny:"https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Felix Mittermeier" },
                { id:"d3", tiny:"https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Hristo Fidanov" },
                { id:"d4", tiny:"https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Pixabay" },
              ]},
              { cat:"🏯 โบราณ / ประวัติศาสตร์", photos:[
                { id:"h1", tiny:"https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Aenic" },
                { id:"h2", tiny:"https://images.pexels.com/photos/161154/stained-glass-spiral-circle-pattern-161154.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/161154/stained-glass-spiral-circle-pattern-161154.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Pixabay" },
                { id:"h3", tiny:"https://images.pexels.com/photos/262713/pexels-photo-262713.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/262713/pexels-photo-262713.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Pixabay" },
                { id:"h4", tiny:"https://images.pexels.com/photos/1482105/pexels-photo-1482105.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/1482105/pexels-photo-1482105.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Felix Mittermeier" },
              ]},
              { cat:"🎨 Watercolor / Soft", photos:[
                { id:"w1", tiny:"https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Steve Johnson" },
                { id:"w2", tiny:"https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Scott Webb" },
                { id:"w3", tiny:"https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Daria Shevtsova" },
                { id:"w4", tiny:"https://images.pexels.com/photos/1053591/pexels-photo-1053591.jpeg?auto=compress&cs=tinysrgb&h=60&w=100", url:"https://images.pexels.com/photos/1053591/pexels-photo-1053591.jpeg?auto=compress&cs=tinysrgb&w=1200", credit:"Almos Bechtold" },
              ]},
            ].map(group => (
              <div key={group.cat} style={{marginBottom:14}}>
                <div style={{fontSize:10,fontWeight:700,opacity:.5,marginBottom:6,letterSpacing:".05em"}}>{group.cat}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:5}}>
                  {group.photos.map(photo => (
                    <button key={photo.id}
                      onClick={() => setDecor({ type:"image", imgUrl:photo.url, imgCredit:photo.credit, imgId:photo.id })}
                      title={`Photo by ${photo.credit} / Pexels`}
                      style={{
                        padding:0, border:`2px solid ${decor.type==="image" && decor.imgId===photo.id ? theme.accent : "transparent"}`,
                        borderRadius:7, overflow:"hidden", cursor:"pointer", background:"none", transition:".15s",
                        boxShadow: decor.type==="image" && decor.imgId===photo.id ? `0 0 0 2px ${theme.accent}44` : "none",
                      }}>
                      <img src={photo.tiny} alt="" style={{width:"100%",height:44,objectFit:"cover",display:"block"}} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Divider ── */}
          <div style={{height:1,background:`${theme.border}55`,margin:"8px 0 12px"}} />
          <div style={{fontSize:10,fontWeight:700,opacity:.4,marginBottom:8,letterSpacing:".06em"}}>🔍 ค้นหาเพิ่มเติม (ต้องใช้ API Key)</div>

          <div style={{ marginBottom: 8 }}>
            <input
              type="password"
              value={pexelsKey}
              onChange={e => setPexelsKeyLocal(e.target.value)}
              placeholder="Pexels API Key (ฟรีที่ pexels.com/api)"
              style={{ width: "100%", padding: "6px 8px", background: `${theme.border}33`, border: `1px solid ${theme.border}`, borderRadius: 8, fontSize: 11, color: theme.ink, outline: "none" }}
            />
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
            <input
              value={pexelsQuery}
              onChange={e => setPexelsQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && searchPexels()}
              placeholder="เช่น sakura, fog, marble..."
              style={{ flex: 1, padding: "6px 8px", background: `${theme.border}33`, border: `1px solid ${theme.border}`, borderRadius: 8, fontSize: 11, color: theme.ink, outline: "none" }}
            />
            <button onClick={searchPexels} disabled={pexelsLoading}
              style={{ padding: "6px 12px", background: theme.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", opacity: pexelsLoading ? .6 : 1 }}>
              {pexelsLoading ? "…" : "🔍"}
            </button>
          </div>
          {/* Quick tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
            {["sakura","fog","marble","bokeh","gold","ink","snow","fire"].map(tag => (
              <button key={tag} onClick={() => setPexelsQuery(tag)}
                style={{ padding: "2px 7px", border: `1px solid ${theme.border}`, borderRadius: 20, fontSize: 9, background: "transparent", color: theme.ink, cursor: "pointer", opacity: .65 }}>
                {tag}
              </button>
            ))}
          </div>
          {pexelsError && (
            <div style={{ fontSize: 11, color: "#ef4444", marginBottom: 8, padding: "6px 10px", background: "#ef444411", borderRadius: 6 }}>
              ⚠️ {pexelsError}
            </div>
          )}
          {pexelsResults.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}>
              {pexelsResults.map(photo => (
                <button key={photo.id}
                  onClick={() => setDecor({ type:"image", imgUrl:photo.src.landscape||photo.src.medium, imgCredit:photo.photographer, imgId:photo.id })}
                  style={{ padding:0, border:`2px solid ${decor.type==="image"&&decor.imgId===photo.id?theme.accent:"transparent"}`, borderRadius:7, overflow:"hidden", cursor:"pointer", background:"none", transition:".15s" }}>
                  <img src={photo.src.tiny} alt={photo.alt} style={{width:"100%",height:44,objectFit:"cover",display:"block"}}/>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Preview */}
      <div className="sec-head" style={{ marginTop: 18 }}>ตัวอย่าง</div>
      <div style={{ background: `${theme.border}22`, borderRadius: 10, padding: "16px 12px" }}>
        <SceneDividerRenderer settings={settings} theme={theme} />
      </div>
    </div>
  );
});

const RightPanel = memo(function RightPanel({ tab, book, settings, chapters, theme, totalWords, totalChars, estPages, readMins, writingGoal, goalInput, setGoalInput, setWritingGoal, sessionWords, streakData, projectTarget, setProjectTarget, setBookField, setSetting, FONTS, THEMES, COVER_TEMPLATES, LAYOUT_PRESETS, LAYOUT_SIZES, DIVIDERS, onSave, onLoad, onExportPDF, onExportEPUB, onOpenSnapshots, showToast, setChapters, wordCount, setParagraphFormat, setTypoOptions, onApplyTypography, tocPreviewChapters, selectedImage, onUpdateImage, onDeleteImage, onInsertImage, onSelectImage, chapterImages }) {

  // BUG FIX: sidebar sends "bookinfo" but panel checked "info" → always showed fallback
  if (tab === "bookinfo" || tab === "info") return (
    <div>
      <div className="sec-head">ข้อมูลหนังสือ</div>
      {[["title","ชื่อหนังสือ"],["subtitle","ชื่อรอง"],["author","นามจริง"],["pen","นามปากกา"],["publisher","สำนักพิมพ์"],["year","ปีที่พิมพ์"],["genre","แนว"],["series","Series"],["seriesNum","เล่มที่"]].map(([k,lbl]) => (
        <div key={k}>
          <label style={{fontSize:10,opacity:.5,display:"block",marginBottom:2}}>{lbl}</label>
          <input className="book-field" value={book[k]||""} onChange={e=>setBookField(k,e.target.value)} placeholder={lbl} />
        </div>
      ))}
    </div>
  );

  if (tab === "toc") return (
    <TOCStylePanel
      settings={settings}
      setSetting={setSetting}
      theme={theme}
      previewChapters={tocPreviewChapters || []}
    />
  );

  if (tab === "image") return (
    <div style={{display:"flex",flexDirection:"column",gap:0}}>
      {/* Insert button */}
      <button
        onClick={onInsertImage}
        style={{margin:"0 0 10px",padding:"9px 14px",background:theme.accent,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:8,justifyContent:"center"}}>
        🖼 แทรกรูปภาพใหม่
      </button>
      {/* List of images in this chapter */}
      {chapterImages && chapterImages.length > 0 && (
        <div style={{marginBottom:10}}>
          <div style={{fontSize:10,fontWeight:700,opacity:.5,letterSpacing:".08em",textTransform:"uppercase",marginBottom:6}}>รูปในบทนี้ ({chapterImages.length})</div>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {chapterImages.map(img => (
              <button key={img.id}
                onClick={()=>onSelectImage && onSelectImage(img.id)}
                style={{
                  padding:"7px 10px",borderRadius:8,border:`1.5px solid ${selectedImage?.id===img.id?theme.accent:theme.border}`,
                  background:selectedImage?.id===img.id?`${theme.accent}15`:theme.bg,
                  display:"flex",alignItems:"center",gap:8,cursor:"pointer",textAlign:"left",
                  color:theme.ink,
                }}>
                {img.src
                  ? <img src={img.src} alt="" style={{width:32,height:24,objectFit:"cover",borderRadius:4,flexShrink:0,border:`1px solid ${theme.border}`}}/>
                  : <div style={{width:32,height:24,background:`${theme.border}55`,borderRadius:4,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>🖼</div>
                }
                <div style={{flex:1,overflow:"hidden"}}>
                  <div style={{fontSize:11,fontWeight:selectedImage?.id===img.id?700:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:selectedImage?.id===img.id?theme.accent:theme.ink}}>
                    {img.alt||img.id.slice(-6)}
                  </div>
                  <div style={{fontSize:9,opacity:.45}}>{img.wrapMode} · {img.width}×{img.height}px</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Properties of selected image */}
      {selectedImage
        ? <ImagePropertiesPanel
            image={selectedImage}
            onUpdate={onUpdateImage}
            onDelete={onDeleteImage}
            onClose={()=>{}}
            theme={theme}
            standalone={false}
          />
        : (
          <div style={{textAlign:"center",padding:"28px 0",opacity:.4,fontSize:12,fontStyle:"italic",lineHeight:1.7}}>
            คลิกที่รูปในหน้าเขียน<br/>เพื่อแก้ไขคุณสมบัติ
          </div>
        )
      }
    </div>
  );



  if (tab === "chapters") return (
    <div>
      <div className="sec-head">จัดการบท</div>
      <div style={{fontSize:12,opacity:.55,padding:"8px 0"}}>ดับเบิลคลิกที่ชื่อบทใน Panel ซ้ายเพื่อแก้ไขชื่อ · ลากเพื่อเรียงลำดับ</div>
      <div style={{marginTop:8,padding:"10px 12px",background:`${theme.border}22`,borderRadius:10,fontSize:12}}>
        <div style={{opacity:.55,marginBottom:4}}>ยอดรวม</div>
        <div style={{fontWeight:700,color:theme.accent}}>{totalWords.toLocaleString()} คำ · {chapters.length} บท</div>
      </div>
    </div>
  );

  if (tab === "typography") return (
    <ParagraphControls
      format={settings.paragraphFormat || {}}
      onFormatChange={setParagraphFormat}
      typoOptions={settings.typoOptions || {}}
      onTypoChange={setTypoOptions}
      onApplyTypography={onApplyTypography}
      chapters={chapters}
      theme={theme}
      font={settings.font}
      settings={settings}
      setSetting={setSetting}
      FONTS={FONTS}
      LAYOUT_PRESETS={LAYOUT_PRESETS}
    />
  );

  if (tab === "layout") return (
    <div>
      <div className="sec-head">ขนาดหน้า</div>
      <div className="layout-grid">
        {Object.entries(LAYOUT_SIZES).map(([k,s]) => (
          <button key={k} className={"layout-preset"+(settings.layout===k?" active":"")} onClick={()=>setSetting("layout",k)}>{s.label}</button>
        ))}
      </div>
      <div className="sec-head">การวางหน้า</div>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        {[["portrait","🖹 แนวตั้ง"],["landscape","🖺 แนวนอน"]].map(([val,label])=>(
          <button key={val} onClick={()=>setSetting("orientation",val)}
            style={{flex:1,padding:"8px 0",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",border:`1.5px solid ${(settings.orientation||"portrait")===val?theme.accent:theme.border}`,background:(settings.orientation||"portrait")===val?`${theme.accent}22`:"transparent",color:(settings.orientation||"portrait")===val?theme.accent:theme.ink,transition:".15s"}}>
            {label}
          </button>
        ))}
      </div>
      <div className="sec-head">ไม้บรรทัด</div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,padding:"8px 0"}}>
        <span style={{fontSize:13,opacity:.75}}>📏 แสดงไม้บรรทัด</span>
        <button onClick={()=>setSetting("showRuler",!(settings.showRuler||false))}
          style={{padding:"5px 16px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",border:`1.5px solid ${(settings.showRuler||false)?theme.accent:theme.border}`,background:(settings.showRuler||false)?`${theme.accent}22`:"transparent",color:(settings.showRuler||false)?theme.accent:theme.ink,transition:".15s"}}>
          {(settings.showRuler||false)?"เปิด ✓":"ปิด"}
        </button>
      </div>
      <div className="sec-head">Zoom</div>
      <div className="slider-row">
        <label>Zoom</label>
        <input type="range" min={50} max={200} step={5} value={settings.zoom} onChange={e=>setSetting("zoom",parseInt(e.target.value))} />
        <span>{settings.zoom}%</span>
      </div>
    </div>
  );

  if (tab === "divider") return (
    <SceneDividerDecorPanel
      settings={settings}
      setSetting={setSetting}
      theme={theme}
      showToast={showToast}
      DIVIDERS={DIVIDERS}
    />
  );

  if (tab === "theme") return (
    <div>
      <div className="sec-head">Theme</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
        {Object.keys(THEMES).map(t => (
          <button key={t} className={"theme-btn"+(settings.theme===t?" active":"")} onClick={()=>setSetting("theme",t)}>
            {t==="white"?"☀ White":t==="sepia"?"📜 Sepia":"🌙 Dark"}
          </button>
        ))}
      </div>
    </div>
  );

  if (tab === "backup") return (
    <div>
      <div className="sec-head">Export / Import</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
        <button className="accent-btn" onClick={onSave}>💾 Export .novelforge</button>
        <button className="btn" onClick={onLoad} style={{padding:"8px 12px",fontSize:13}}>📂 Import Project</button>
      </div>
      <div className="sec-head">Export หนังสือ</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
        <button className="accent-btn" onClick={onExportPDF}>📄 Export PDF (A5)</button>
        <button className="accent-btn" onClick={onExportEPUB} style={{width:"100%"}}>📖 Export EPUB</button>
      </div>
      <div className="sec-head">Version History</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
        <button className="btn" onClick={onOpenSnapshots} style={{padding:"8px 12px",fontSize:13}}>📸 ดู Snapshot / Version History</button>
      </div>
      <div className="sec-head">Storage</div>
      <div style={{fontSize:12,opacity:.55,padding:"6px 0",lineHeight:1.7}}>
        📦 ข้อมูลเก็บใน <strong>IndexedDB</strong> ของเบราว์เซอร์<br/>
        💾 Autosave ทุก 2 วินาที<br/>
        📤 Export .novelforge เพื่อย้ายเครื่อง
      </div>
    </div>
  );

  if (tab === "stats") return (
    <div>
      {/* ── V27: Writing Goal (Daily) ── */}
      <div className="sec-head">🎯 Writing Goal (วันนี้)</div>
      <div style={{padding:"12px 14px",background:`${theme.border}22`,borderRadius:12,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <span style={{fontSize:12,opacity:.65,flexShrink:0}}>เป้าหมาย</span>
          <input type="number" value={goalInput} onChange={e=>setGoalInput(e.target.value)}
            onBlur={()=>{ const n=parseInt(goalInput); if(n>0) setWritingGoal(n); }}
            style={{width:72,padding:"4px 8px",background:`${theme.border}55`,border:`1px solid ${theme.border}`,borderRadius:6,fontSize:13,color:theme.ink,textAlign:"center",outline:"none"}} />
          <span style={{fontSize:12,opacity:.65}}>คำ/วัน</span>
        </div>
        {/* Session progress bar */}
        {(() => {
          const sw = sessionWords || 0;
          const pct = Math.min(100, writingGoal > 0 ? Math.round(sw / writingGoal * 100) : 0);
          const barColor = pct >= 100 ? "#22c55e" : pct >= 60 ? theme.accent : theme.accent;
          return (
            <>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:11,opacity:.6}}>เซสชันนี้</span>
                <span style={{fontSize:11,fontWeight:700,color:pct>=100?"#22c55e":theme.accent}}>{sw.toLocaleString()} / {writingGoal.toLocaleString()} คำ · {pct}%</span>
              </div>
              <div style={{height:10,background:`${theme.border}55`,borderRadius:20,overflow:"hidden",marginBottom:6}}>
                <div style={{height:"100%",width:`${pct}%`,background:pct>=100?"#22c55e":barColor,borderRadius:20,transition:".5s",
                  boxShadow:pct>=100?"0 0 8px #22c55e88":"none"}} />
              </div>
              {pct >= 100 && <div style={{fontSize:11,color:"#22c55e",fontWeight:700}}>🎉 ถึงเป้าแล้ว!</div>}
            </>
          );
        })()}
      </div>

      {/* ── V27: Writing Streak ── */}
      <div className="sec-head">🔥 Writing Streak</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        {[
          {val:`${streakData?.streak||0} วัน`, lbl:"Streak ปัจจุบัน", color:"#f97316"},
          {val:`${streakData?.longestStreak||0} วัน`, lbl:"สูงสุดตลอดกาล", color:theme.accent},
          {val:`${streakData?.totalDaysWritten||0} วัน`, lbl:"รวมวันที่เขียน", color:theme.accent},
          {val:streakData?.lastDate||"-", lbl:"เขียนล่าสุด", color:theme.accent},
        ].map((s,i)=>(
          <div key={i} style={{padding:"10px 12px",background:`${theme.border}33`,borderRadius:10}}>
            <div style={{fontSize:16,fontWeight:800,color:s.color}}>{s.val}</div>
            <div style={{fontSize:10,opacity:.5,marginTop:2}}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* ── Statistics ── */}
      <div className="sec-head">Statistics</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
        {[
          {val:totalWords.toLocaleString(),lbl:"คำทั้งหมด"},
          {val:totalChars.toLocaleString(),lbl:"ตัวอักษร"},
          {val:"~"+estPages,lbl:"หน้า A5"},
          {val:readMins+" น.",lbl:"เวลาอ่าน"},
          {val:chapters.length,lbl:"จำนวนบท"},
          {val:Math.round(totalWords/Math.max(1,chapters.length)).toLocaleString(),lbl:"คำ/บท"},
        ].map((s,i) => (
          <div key={i} className="stat-card"><div className="val">{s.val}</div><div className="lbl">{s.lbl}</div></div>
        ))}
      </div>

      {/* ── V27: Project Target Progress Bar ── */}
      <div className="sec-head">📊 Project Target</div>
      <div style={{padding:"12px 14px",background:`${theme.border}22`,borderRadius:12,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <span style={{fontSize:12,opacity:.65,flexShrink:0}}>เป้าหมาย</span>
          <input type="number" value={projectTarget||80000}
            onChange={e=>{ const n=parseInt(e.target.value); if(n>0) setProjectTarget(n); }}
            style={{width:80,padding:"4px 8px",background:`${theme.border}55`,border:`1px solid ${theme.border}`,borderRadius:6,fontSize:13,color:theme.ink,textAlign:"center",outline:"none"}} />
          <span style={{fontSize:12,opacity:.65}}>คำ</span>
        </div>
        {(() => {
          const pct = Math.min(100, Math.round(totalWords / Math.max(1, projectTarget||80000) * 100));
          const remaining = Math.max(0, (projectTarget||80000) - totalWords);
          const daysLeft = writingGoal > 0 ? Math.ceil(remaining / writingGoal) : null;
          return (
            <>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:11,opacity:.6}}>{totalWords.toLocaleString()} / {(projectTarget||80000).toLocaleString()} คำ</span>
                <span style={{fontSize:11,fontWeight:700,color:pct>=100?"#22c55e":theme.accent}}>{pct}%</span>
              </div>
              <div style={{height:10,background:`${theme.border}55`,borderRadius:20,overflow:"hidden",marginBottom:6}}>
                <div style={{height:"100%",width:`${pct}%`,background:pct>=100?"#22c55e":theme.accent,borderRadius:20,transition:".5s"}} />
              </div>
              {daysLeft !== null && remaining > 0 && (
                <div style={{fontSize:11,opacity:.55}}>เหลืออีก {remaining.toLocaleString()} คำ · ประมาณ {daysLeft} วัน (ที่ {writingGoal} คำ/วัน)</div>
              )}
              {pct >= 100 && <div style={{fontSize:11,color:"#22c55e",fontWeight:700}}>✅ ครบเป้าหมายโปรเจกต์แล้ว!</div>}
            </>
          );
        })()}
      </div>

      {/* ── Per-chapter progress ── */}
      <div className="sec-head">รายละเอียดแต่ละบท</div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {chapters.map((ch,i) => {
          const wc = wordCount(ch.content);
          const pct = totalWords>0?Math.round(wc/totalWords*100):0;
          return (
            <div key={ch.id} style={{padding:"8px 10px",background:`${theme.border}33`,borderRadius:8}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:11,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"60%"}}>{i+1}. {ch.title}</span>
                <span style={{fontSize:11,opacity:.65,color:theme.accent}}>{wc.toLocaleString()} คำ</span>
              </div>
              <div style={{height:4,background:`${theme.border}55`,borderRadius:10,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct}%`,background:theme.accent,borderRadius:10}} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return <div style={{opacity:.45,fontSize:13,padding:8}}>เลือกหมวดหมู่จาก Sidebar ซ้าย</div>;
}
);

// ─── BOOK STRUCTURE PANEL ────────────────────────────────────────────────────
const BookStructurePanel = memo(function BookStructurePanel({ bookStructure, setBookStructure, chapters, specialPages, setSpecialPages, theme, showToast, book }) {
  const [dragItem, setDragItem] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [showAddPage, setShowAddPage] = useState(false);
  const [editPageId, setEditPageId] = useState(null);
  const [editPageDraft, setEditPageDraft] = useState({});

  // Build full ordered list: front_cover, special pages (by position), chapters, back_cover
  const structureWithDetails = bookStructure.map(s => {
    if (s.type === "special") {
      const sp = specialPages.find(p => p.id === s.refId);
      return { ...s, detail: sp };
    }
    return s;
  });

  function addSpecialPage(type) {
    const tpl = SPECIAL_PAGE_TYPES.find(t => t.id === type);
    const sp = {
      id: newId(),
      type,
      title: tpl?.label || "หน้าใหม่",
      content: type === "copyright" ? `© ${new Date().getFullYear()} ${book.author||"ผู้แต่ง"} สงวนลิขสิทธิ์` :
               type === "dedication" ? "หนังสือเล่มนี้อุทิศให้..." :
               type === "about_author" ? `${book.author||"ผู้แต่ง"} เป็นนักเขียน...` : "",
    };
    setSpecialPages(prev => [...prev, sp]);
    // Insert into structure before back_cover
    const bcIdx = bookStructure.findIndex(s => s.type === "back_cover");
    const insertAt = bcIdx >= 0 ? bcIdx : bookStructure.length;
    const newEntry = { id: newId(), type: "special", label: tpl?.label || "หน้าใหม่", locked:false, visible:true, refId: sp.id };
    const arr = [...bookStructure];
    arr.splice(insertAt, 0, newEntry);
    setBookStructure(arr);
    setShowAddPage(false);
    showToast(`➕ เพิ่ม ${tpl?.label||"หน้า"} แล้ว`);
    // Open edit immediately
    setEditPageId(sp.id);
    setEditPageDraft({ ...sp });
  }

  function deleteStructureItem(structId) {
    const item = bookStructure.find(s => s.id === structId);
    if (item?.locked) { showToast("⚠️ ไม่สามารถลบหน้านี้ได้"); return; }
    if (item?.type === "special" && item.refId) {
      setSpecialPages(prev => prev.filter(p => p.id !== item.refId));
    }
    setBookStructure(prev => prev.filter(s => s.id !== structId));
    showToast("🗑 ลบหน้าแล้ว");
  }

  function toggleVisible(structId) {
    setBookStructure(prev => prev.map(s => s.id === structId ? {...s, visible: !s.visible} : s));
  }

  function moveItem(id, dir) {
    const idx = bookStructure.findIndex(s => s.id === id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= bookStructure.length) return;
    if (bookStructure[newIdx]?.locked) return;
    const arr = [...bookStructure];
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
    setBookStructure(arr);
  }

  function savePageEdit() {
    setSpecialPages(prev => prev.map(p => p.id === editPageId ? { ...editPageDraft } : p));
    setEditPageId(null);
    showToast("✅ บันทึกแล้ว");
  }

  const ICONS = { front_cover:"📕", back_cover:"📘", toc:"📋", chapters:"📑", special:"📄" };

  return (
    <div style={{flex:1,display:"flex",overflow:"hidden",background:theme.bg}}>
      {/* Structure list */}
      <div style={{width:320,background:theme.panel,borderRight:`1px solid ${theme.border}`,display:"flex",flexDirection:"column"}}>
        <div style={{padding:"14px 16px 10px",borderBottom:`1px solid ${theme.border}`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
            <div style={{fontWeight:800,fontSize:15}}>☰ Book Structure</div>
            <button onClick={()=>setShowAddPage(true)} style={{padding:"5px 12px",background:theme.accent,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Add Page</button>
          </div>
          <div style={{fontSize:11,opacity:.5}}>ลากเรียงลำดับหน้าหนังสือ</div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"10px 12px"}}>
          {structureWithDetails.map((item,i) => (
            <div key={item.id}
              draggable={!item.locked}
              onDragStart={()=>{ if(!item.locked) setDragItem(item.id); }}
              onDragOver={e=>{e.preventDefault();setDragOver(item.id);}}
              onDrop={()=>{
                if(!dragItem||dragItem===item.id) return;
                const from=bookStructure.findIndex(s=>s.id===dragItem);
                const to=bookStructure.findIndex(s=>s.id===item.id);
                if(bookStructure[to]?.locked||bookStructure[from]?.locked) return;
                const arr=[...bookStructure]; const [m]=arr.splice(from,1); arr.splice(to,0,m);
                setBookStructure(arr); setDragItem(null); setDragOver(null);
              }}
              onDragEnd={()=>{setDragItem(null);setDragOver(null);}}
              className="structure-item"
              style={{
                opacity:item.visible?1:.4,
                outline:dragOver===item.id?`2px dashed ${theme.accent}`:undefined,
                cursor:item.locked?"default":"grab",
              }}>
              <span style={{opacity:.3,cursor:item.locked?"default":"grab",fontSize:14}}>{item.locked?"🔒":"⠿"}</span>
              <span style={{fontSize:16}}>{ICONS[item.type]||"📄"}</span>
              <div style={{flex:1,overflow:"hidden"}}>
                <div style={{fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                  {item.type==="chapters" ? `เนื้อเรื่อง (${chapters.length} บท)` : item.label||item.detail?.title||"หน้า"}
                </div>
                {item.type==="special" && item.detail && (
                  <div style={{fontSize:10,opacity:.5}}>{SPECIAL_PAGE_TYPES.find(t=>t.id===item.detail.type)?.icon} {item.detail.type}</div>
                )}
              </div>
              <div style={{display:"flex",gap:3,alignItems:"center"}}>
                {!item.locked && (
                  <>
                    <button className="btn" style={{padding:"2px 5px",fontSize:10}} onClick={()=>moveItem(item.id,-1)}>↑</button>
                    <button className="btn" style={{padding:"2px 5px",fontSize:10}} onClick={()=>moveItem(item.id,1)}>↓</button>
                  </>
                )}
                <button className="btn" style={{padding:"2px 6px",fontSize:10,opacity:item.visible?1:.5}} onClick={()=>toggleVisible(item.id)}>
                  {item.visible?"👁":"🚫"}
                </button>
                {item.type==="special" && (
                  <button className="btn" style={{padding:"2px 6px",fontSize:10}} onClick={()=>{
                    const sp=specialPages.find(p=>p.id===item.refId);
                    if(sp){ setEditPageId(sp.id); setEditPageDraft({...sp}); }
                  }}>✏</button>
                )}
                {!item.locked && (
                  <button className="btn" style={{padding:"2px 5px",fontSize:10,color:"#ef4444",borderColor:"#ef444444"}} onClick={()=>deleteStructureItem(item.id)}>×</button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{padding:"8px 12px",borderTop:`1px solid ${theme.border}`,fontSize:11,opacity:.45}}>
          {bookStructure.length} รายการ · ลากเพื่อเรียงลำดับ
        </div>
      </div>

      {/* Edit page content */}
      <div style={{flex:1,overflow:"auto",padding:28}}>
        {editPageId ? (
          <div style={{maxWidth:640}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <div style={{fontSize:18,fontWeight:800}}>✏ แก้ไขหน้า</div>
              <div style={{display:"flex",gap:8}}>
                <button style={{padding:"7px 16px",background:"#22c55e",color:"#fff",border:"none",borderRadius:8,fontSize:13,cursor:"pointer",fontWeight:600}} onClick={savePageEdit}>✅ บันทึก</button>
                <button className="btn" style={{padding:"7px 12px",fontSize:13}} onClick={()=>setEditPageId(null)}>ยกเลิก</button>
              </div>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:11,opacity:.55,display:"block",marginBottom:4}}>ชื่อหน้า</label>
              <input className="book-field" value={editPageDraft.title||""} onChange={e=>setEditPageDraft(d=>({...d,title:e.target.value}))} />
            </div>
            <div>
              <label style={{fontSize:11,opacity:.55,display:"block",marginBottom:4}}>เนื้อหา</label>
              <textarea className="book-field" style={{minHeight:240,resize:"vertical",lineHeight:1.7}}
                value={editPageDraft.content||""}
                onChange={e=>setEditPageDraft(d=>({...d,content:e.target.value}))}
                placeholder="เนื้อหาของหน้านี้..." />
            </div>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",opacity:.3}}>
            <div style={{fontSize:48,marginBottom:12}}>☰</div>
            <div style={{fontSize:15,fontWeight:700,marginBottom:6}}>Book Structure</div>
            <div style={{fontSize:13}}>คลิก ✏ ที่หน้า Special Page เพื่อแก้ไขเนื้อหา</div>
          </div>
        )}
      </div>

      {/* Add page modal */}
      {showAddPage && (
        <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget) setShowAddPage(false);}}>
          <div className="modal-box fade-in">
            <div style={{fontWeight:800,fontSize:17,marginBottom:16}}>+ เพิ่มหน้าพิเศษ</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {SPECIAL_PAGE_TYPES.map(t => (
                <button key={t.id} className="sp-type-btn" onClick={()=>addSpecialPage(t.id)}>
                  <div style={{fontSize:22,marginBottom:4}}>{t.icon}</div>
                  <div style={{fontSize:12,fontWeight:700,lineHeight:1.3}}>{t.label}</div>
                  <div style={{fontSize:10,opacity:.55,marginTop:2}}>{t.labelTh}</div>
                </button>
              ))}
            </div>
            <div style={{marginTop:16}}>
              <button className="btn" onClick={()=>setShowAddPage(false)} style={{width:"100%",padding:"8px",fontSize:13}}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
);

// ─── COVERS PANEL ─────────────────────────────────────────────────────────────
const CoversPanel = memo(function CoversPanel({ settings, setSetting, book, theme, showToast, COVER_TEMPLATES, onFrontCoverClick, onBackCoverClick, assets }) {
  const [activeTab, setActiveTab] = useState("front");

  const frontCoverTpl = COVER_TEMPLATES[settings.coverTemplate] || COVER_TEMPLATES.dark;
  const backCoverTpl = COVER_TEMPLATES[settings.backCoverTemplate || "dark"] || COVER_TEMPLATES.dark;

  const coverAssets = assets.filter(a => a.category === "ปกหน้า" || a.category === "ปกหลัง" || a.category === "อื่นๆ");

  return (
    <div style={{flex:1,display:"flex",overflow:"hidden",background:theme.bg}}>
      {/* Left: tab switcher + preview */}
      <div style={{width:320,background:theme.panel,borderRight:`1px solid ${theme.border}`,display:"flex",flexDirection:"column",padding:20,gap:16}}>
        <div style={{display:"flex",gap:8}}>
          <button className={"tab-btn"+(activeTab==="front"?" active":"")} onClick={()=>setActiveTab("front")} style={{flex:1,fontSize:13}}>📕 ปกหน้า</button>
          <button className={"tab-btn"+(activeTab==="back"?" active":"")} onClick={()=>setActiveTab("back")} style={{flex:1,fontSize:13}}>📘 ปกหลัง</button>
        </div>

        {/* Front cover preview */}
        {activeTab === "front" && (
          <>
            <div style={{borderRadius:12,overflow:"hidden",position:"relative",height:220,...(settings.coverImageData?{backgroundImage:`url(${settings.coverImageData})`,backgroundSize:"cover",backgroundPosition:"center",filter:`brightness(${settings.coverBrightness}%)`}:{background:frontCoverTpl.bg})}}>
              {settings.coverImageData && <div style={{position:"absolute",inset:0,background:`rgba(0,0,0,${(settings.coverOverlay||30)/100})`}} />}
              <div style={{position:"relative",zIndex:1,padding:16,display:"flex",flexDirection:"column",justifyContent:"flex-end",height:"100%"}}>
                <div style={{color:"#fff",fontWeight:800,fontSize:16,textShadow:"0 2px 8px #0008",lineHeight:1.3,marginBottom:4}}>{book.title||"ชื่อหนังสือ"}</div>
                {book.subtitle && <div style={{color:"#ffffffcc",fontSize:12,marginBottom:4}}>{book.subtitle}</div>}
                <div style={{color:"#ffffff88",fontSize:12}}>{book.pen||book.author||"ผู้แต่ง"}</div>
              </div>
            </div>
            <button className="accent-btn" onClick={onFrontCoverClick} style={{width:"100%"}}>📸 อัพโหลดภาพปกหน้า</button>
            {settings.coverImageData && (
              <button className="btn" onClick={()=>setSetting("coverImageData",null)} style={{width:"100%",fontSize:12}}>🗑 ลบภาพปกหน้า</button>
            )}
          </>
        )}

        {/* Back cover preview */}
        {activeTab === "back" && (
          <>
            <div style={{borderRadius:12,overflow:"hidden",position:"relative",height:220,...(settings.backCoverImageData?{backgroundImage:`url(${settings.backCoverImageData})`,backgroundSize:"cover",backgroundPosition:"center"}:{background:backCoverTpl.bg})}}>
              <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.35)"}} />
              <div style={{position:"relative",zIndex:1,padding:16,display:"flex",flexDirection:"column",justifyContent:"space-between",height:"100%"}}>
                <div style={{color:"#ffffff88",fontSize:10,textTransform:"uppercase",letterSpacing:".1em"}}>ปกหลัง</div>
                <div>
                  {settings.backCoverText ? (
                    <div style={{color:"#ffffffdd",fontSize:12,lineHeight:1.6,marginBottom:8}}>{settings.backCoverText.substring(0,120)}{settings.backCoverText.length>120?"...":""}</div>
                  ) : (
                    <div style={{color:"#ffffff55",fontSize:12,fontStyle:"italic"}}>ใส่คำโปรยปก...</div>
                  )}
                  <div style={{color:"#ffffffaa",fontSize:11}}>{book.publisher||"สำนักพิมพ์"}</div>
                </div>
              </div>
            </div>
            <button className="accent-btn" onClick={onBackCoverClick} style={{width:"100%"}}>📸 อัพโหลดภาพปกหลัง</button>
            {settings.backCoverImageData && (
              <button className="btn" onClick={()=>setSetting("backCoverImageData",null)} style={{width:"100%",fontSize:12}}>🗑 ลบภาพปกหลัง</button>
            )}
            <div>
              <label style={{fontSize:11,opacity:.55,display:"block",marginBottom:6}}>คำโปรยปกหลัง</label>
              <textarea className="book-field" style={{minHeight:80,resize:"vertical"}}
                value={settings.backCoverText||""} onChange={e=>setSetting("backCoverText",e.target.value)}
                placeholder="ใส่คำโปรยหรือเรื่องย่อสั้นๆ..." />
            </div>
          </>
        )}
      </div>

      {/* Right: Templates + settings */}
      <div style={{flex:1,overflow:"auto",padding:24}}>
        {activeTab === "front" && (
          <div style={{maxWidth:600}}>
            <div style={{fontSize:15,fontWeight:800,marginBottom:16}}>🎨 เทมเพลตปกหน้า</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(90px,1fr))",gap:10,marginBottom:24}}>
              {Object.entries(COVER_TEMPLATES).map(([key,tpl]) => (
                <div key={key} style={{cursor:"pointer",borderRadius:10,overflow:"hidden",border:`2px solid ${settings.coverTemplate===key?theme.accent:theme.border}`,transition:".15s",transform:settings.coverTemplate===key?"scale(1.05)":"none"}}
                  onClick={()=>setSetting("coverTemplate",key)} title={key}>
                  <div style={{height:60,background:tpl.bg}} />
                  <div style={{padding:"4px 6px",background:theme.panel,fontSize:10,opacity:.6,textAlign:"center"}}>{key}</div>
                </div>
              ))}
            </div>
            {settings.coverImageData && (
              <>
                <div style={{fontSize:13,fontWeight:700,marginBottom:12,opacity:.7}}>ตั้งค่าภาพปก</div>
                {[
                  {lbl:"ความสว่าง",k:"coverBrightness",min:20,max:150},
                  {lbl:"Overlay",k:"coverOverlay",min:0,max:80},
                ].map(({lbl,k,min,max}) => (
                  <div key={k} className="slider-row">
                    <label>{lbl}</label>
                    <input type="range" min={min} max={max} value={settings[k]||50} onChange={e=>setSetting(k,parseInt(e.target.value))} />
                    <span>{settings[k]||50}%</span>
                  </div>
                ))}
              </>
            )}
            {coverAssets.length > 0 && (
              <>
                <div style={{fontSize:13,fontWeight:700,marginBottom:12,opacity:.7,marginTop:20}}>📁 ใช้จาก Asset Library</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(80px,1fr))",gap:8}}>
                  {coverAssets.map(a => (
                    <div key={a.id} style={{cursor:"pointer",borderRadius:8,overflow:"hidden",border:`1px solid ${theme.border}`,transition:".15s"}}
                      onClick={()=>setSetting("coverImageData",a.data)}
                      title={a.name}>
                      <img src={a.data} alt={a.name} style={{width:"100%",height:60,objectFit:"cover"}} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "back" && (
          <div style={{maxWidth:600}}>
            <div style={{fontSize:15,fontWeight:800,marginBottom:16}}>🎨 เทมเพลตปกหลัง</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(90px,1fr))",gap:10,marginBottom:24}}>
              {Object.entries(COVER_TEMPLATES).map(([key,tpl]) => (
                <div key={key} style={{cursor:"pointer",borderRadius:10,overflow:"hidden",border:`2px solid ${(settings.backCoverTemplate||"dark")===key?theme.accent:theme.border}`,transition:".15s",transform:(settings.backCoverTemplate||"dark")===key?"scale(1.05)":"none"}}
                  onClick={()=>setSetting("backCoverTemplate",key)} title={key}>
                  <div style={{height:60,background:tpl.bg}} />
                  <div style={{padding:"4px 6px",background:theme.panel,fontSize:10,opacity:.6,textAlign:"center"}}>{key}</div>
                </div>
              ))}
            </div>
            {coverAssets.length > 0 && (
              <>
                <div style={{fontSize:13,fontWeight:700,marginBottom:12,opacity:.7}}>📁 ใช้จาก Asset Library</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(80px,1fr))",gap:8}}>
                  {coverAssets.map(a => (
                    <div key={a.id} style={{cursor:"pointer",borderRadius:8,overflow:"hidden",border:`1px solid ${theme.border}`,transition:".15s"}}
                      onClick={()=>setSetting("backCoverImageData",a.data)}
                      title={a.name}>
                      <img src={a.data} alt={a.name} style={{width:"100%",height:60,objectFit:"cover"}} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
);

// ─── ASSETS PANEL ─────────────────────────────────────────────────────────────
const AssetsPanel = memo(function AssetsPanel({ assets, theme, showToast, onUpload, onUploadWithCategory, onDelete, onUseFrontCover, onUseBackCover, assetInput }) {
  const [filterCat, setFilterCat] = useState("ทั้งหมด");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [uploadCategory, setUploadCategory] = useState("อื่นๆ");
  const catInput = useRef(null);

  const filtered = filterCat === "ทั้งหมด" ? assets : assets.filter(a => a.category === filterCat);

  function formatBytes(bytes) {
    if (!bytes) return "—";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes/1024).toFixed(1) + " KB";
    return (bytes/1024/1024).toFixed(1) + " MB";
  }

  const totalSize = assets.reduce((s,a) => s + (a.size||0), 0);

  return (
    <div style={{flex:1,display:"flex",overflow:"hidden",background:theme.bg}}>
      {/* Left: list */}
      <div style={{width:300,background:theme.panel,borderRight:`1px solid ${theme.border}`,display:"flex",flexDirection:"column"}}>
        <div style={{padding:"12px 14px 10px",borderBottom:`1px solid ${theme.border}`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <div>
              <div style={{fontWeight:800,fontSize:14}}>📁 Asset Library</div>
              <div style={{fontSize:10,opacity:.45}}>{assets.length} ไฟล์ · {formatBytes(totalSize)}</div>
            </div>
            <div>
              <input ref={catInput} type="file" accept="image/*" multiple style={{display:"none"}} onChange={e=>onUploadWithCategory(e,uploadCategory)} />
              <button style={{padding:"5px 12px",background:theme.accent,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer"}}
                onClick={()=>catInput.current?.click()}>+ อัพโหลด</button>
            </div>
          </div>
          <div style={{display:"flex",gap:4,marginBottom:8}}>
            <label style={{fontSize:10,opacity:.55,flexShrink:0,paddingTop:2}}>หมวด:</label>
            <select value={uploadCategory} onChange={e=>setUploadCategory(e.target.value)}
              style={{flex:1,padding:"3px 6px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:6,fontSize:11,color:theme.ink,outline:"none"}}>
              {ASSET_CATEGORIES.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {["ทั้งหมด",...ASSET_CATEGORIES].map(c => (
              <button key={c} onClick={()=>setFilterCat(c)} style={{padding:"2px 8px",border:`1px solid ${filterCat===c?theme.accent:theme.border}`,borderRadius:20,fontSize:10,background:filterCat===c?theme.accent:"transparent",color:filterCat===c?"#fff":theme.ink,cursor:"pointer"}}>{c}</button>
            ))}
          </div>
        </div>

        <div style={{flex:1,overflowY:"auto",padding:"10px 10px"}}>
          {filtered.length === 0 ? (
            <div style={{textAlign:"center",opacity:.3,padding:32}}>
              <div style={{fontSize:32,marginBottom:8}}>📁</div>
              <div style={{fontSize:13}}>ยังไม่มี Asset</div>
              <div style={{fontSize:11,marginTop:4}}>กด + อัพโหลด</div>
            </div>
          ) : (
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {filtered.map(a => (
                <div key={a.id} className="asset-card" onClick={()=>setSelectedAsset(a)}
                  style={{border:`1.5px solid ${selectedAsset?.id===a.id?theme.accent:theme.border}`}}>
                  <img src={a.data} alt={a.name} style={{width:"100%",height:64,objectFit:"cover",borderRadius:6,marginBottom:6}} />
                  <div style={{fontSize:10,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",opacity:.8}}>{a.name}</div>
                  <div style={{fontSize:9,opacity:.45}}>{a.category} · {formatBytes(a.size)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: asset detail */}
      <div style={{flex:1,overflow:"auto",padding:28}}>
        {selectedAsset ? (
          <div style={{maxWidth:560}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20}}>
              <div>
                <div style={{fontSize:18,fontWeight:800,marginBottom:4}}>{selectedAsset.name}</div>
                <div style={{fontSize:12,opacity:.5}}>{selectedAsset.category} · {formatBytes(selectedAsset.size)} · {selectedAsset.type}</div>
              </div>
              <button style={{padding:"6px 14px",background:"#ef4444",color:"#fff",border:"none",borderRadius:8,fontSize:12,cursor:"pointer"}}
                onClick={()=>{ onDelete(selectedAsset.id); setSelectedAsset(null); }}>🗑 ลบ</button>
            </div>
            <img src={selectedAsset.data} alt={selectedAsset.name} style={{width:"100%",maxHeight:360,objectFit:"contain",borderRadius:12,border:`1px solid ${theme.border}`,marginBottom:20,background:theme.panel}} />
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <button className="accent-btn" onClick={()=>{ onUseFrontCover(selectedAsset); showToast("🎨 ตั้งเป็นปกหน้าแล้ว"); }}>📕 ตั้งเป็นปกหน้า</button>
              <button className="accent-btn" style={{background:theme.border,color:theme.ink}} onClick={()=>{ onUseBackCover(selectedAsset); showToast("🎨 ตั้งเป็นปกหลังแล้ว"); }}>📘 ตั้งเป็นปกหลัง</button>
            </div>
            <div style={{marginTop:16,padding:"10px 14px",background:`${theme.border}22`,borderRadius:10,fontSize:11,opacity:.6}}>
              อัพโหลด: {new Date(selectedAsset.createdAt).toLocaleDateString("th-TH")}
            </div>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",opacity:.3}}>
            <div style={{fontSize:48,marginBottom:12}}>🖼</div>
            <div style={{fontSize:14,fontWeight:700}}>เลือก Asset เพื่อดูรายละเอียด</div>
            <div style={{fontSize:12,marginTop:4}}>หรืออัพโหลดรูปภาพใหม่</div>
          </div>
        )}
      </div>
    </div>
  );
}
);

// ─── CHARACTERS PANEL ────────────────────────────────────────────────────────
const CharactersPanel = memo(function CharactersPanel({ characters, setCharacters, theme, showToast, book, chapters, wordCount, onMentionClick }) {
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState(null);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("ทั้งหมด");

  const filtered = characters.filter(c => {
    const matchSearch = c.name.includes(search) || c.notes?.includes(search);
    const matchRole = filterRole === "ทั้งหมด" || c.role === filterRole;
    return matchSearch && matchRole;
  });

  function addChar() {
    const ch = { id:newId(), name:"ตัวละครใหม่", age:"", role:"ตัวประกอบ", status:"มีชีวิต", appearsIn:"", notes:"", gender:"", faction:"", color:"#8b4513" };
    setCharacters(prev => [...prev, ch]);
    setSelected(ch.id); setDraft({...ch}); setEditMode(true);
    showToast("➕ เพิ่มตัวละครใหม่");
  }

  function saveChar() {
    setCharacters(prev => prev.map(c => c.id === draft.id ? {...draft} : c));
    setEditMode(false); showToast("✅ บันทึกตัวละครแล้ว");
  }

  function deleteChar(id) {
    setCharacters(prev => prev.filter(c => c.id !== id));
    if (selected === id) { setSelected(null); setDraft(null); setEditMode(false); }
    showToast("🗑 ลบตัวละครแล้ว");
  }

  function countMentions(name) {
    return chapters.reduce((s,c) => s + (stripHtml(c.content||"").split(name).length-1||0), 0);
  }

  const selChar = selected ? characters.find(c=>c.id===selected) : null;

  return (
    <div style={{flex:1,display:"flex",overflow:"hidden",background:theme.bg}}>
      <div style={{width:280,background:theme.panel,borderRight:`1px solid ${theme.border}`,display:"flex",flexDirection:"column"}}>
        <div style={{padding:"12px 12px 8px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <span style={{fontSize:13,fontWeight:700}}>👤 ตัวละคร ({characters.length})</span>
            <button onClick={addChar} style={{padding:"5px 12px",background:theme.accent,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer"}}>+ เพิ่ม</button>
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 ค้นหาตัวละคร..."
            style={{width:"100%",padding:"6px 10px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:12,color:theme.ink,outline:"none",marginBottom:8}} />
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {["ทั้งหมด",...CHAR_ROLES].map(r => (
              <button key={r} onClick={()=>setFilterRole(r)} style={{padding:"2px 8px",border:`1px solid ${filterRole===r?theme.accent:theme.border}`,borderRadius:20,fontSize:10,background:filterRole===r?theme.accent:"transparent",color:filterRole===r?"#fff":theme.ink,cursor:"pointer"}}>{r}</button>
            ))}
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"0 10px 10px"}}>
          {filtered.length===0 ? (
            <div style={{opacity:.35,fontSize:13,padding:16,textAlign:"center"}}>ไม่พบตัวละคร</div>
          ) : filtered.map(ch => (
            <div key={ch.id} className="char-card" style={{marginBottom:10,borderColor:selected===ch.id?theme.accent:theme.border}} onClick={()=>{setSelected(ch.id);setDraft({...ch});setEditMode(false);}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:ch.color||theme.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>
                  {ch.gender==="หญิง"?"👩":ch.gender==="ชาย"?"👨":"🧑"}
                </div>
                <div style={{flex:1,overflow:"hidden"}}>
                  <div style={{fontWeight:700,fontSize:13}}>{ch.name}</div>
                  <div style={{fontSize:11,opacity:.55}}>{ch.role}{ch.age?` · ${ch.age} ปี`:""}</div>
                </div>
                <span style={{width:8,height:8,borderRadius:"50%",background:STATUS_COLORS[ch.status]||"#aaa",display:"inline-block"}} />
              </div>
              {ch.faction && <div style={{marginTop:6,fontSize:10,opacity:.5}}>🏛 {ch.faction}</div>}
            </div>
          ))}
        </div>
      </div>

      <div style={{flex:1,overflow:"auto",padding:28}}>
        {!selChar ? (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",opacity:.35}}>
            <div style={{fontSize:48,marginBottom:12}}>👤</div>
            <div style={{fontSize:14}}>เลือกตัวละครจาก Panel ซ้าย</div>
          </div>
        ) : (
          <div style={{maxWidth:640}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:54,height:54,borderRadius:"50%",background:selChar.color||theme.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>
                  {selChar.gender==="หญิง"?"👩":selChar.gender==="ชาย"?"👨":"🧑"}
                </div>
                <div>
                  <div style={{fontSize:20,fontWeight:800}}>{selChar.name}</div>
                  <div style={{fontSize:13,opacity:.55}}>{selChar.role} · <span style={{color:STATUS_COLORS[selChar.status]}}>{selChar.status}</span></div>
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                {!editMode && <button onClick={()=>{setDraft({...selChar});setEditMode(true);}} style={{padding:"7px 16px",background:theme.accent,color:"#fff",border:"none",borderRadius:8,fontSize:13,cursor:"pointer",fontWeight:600}}>✏ แก้ไข</button>}
                {editMode && <button onClick={saveChar} style={{padding:"7px 16px",background:"#22c55e",color:"#fff",border:"none",borderRadius:8,fontSize:13,cursor:"pointer",fontWeight:600}}>✅ บันทึก</button>}
                {editMode && <button onClick={()=>setEditMode(false)} style={{padding:"7px 16px",background:"transparent",color:theme.ink,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:13,cursor:"pointer"}}>ยกเลิก</button>}
                <button onClick={()=>deleteChar(selChar.id)} style={{padding:"7px 16px",background:"transparent",color:"#ef4444",border:"1px solid #ef444455",borderRadius:8,fontSize:13,cursor:"pointer"}}>🗑</button>
              </div>
            </div>
            {editMode && draft ? (
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[["name","ชื่อ"],["age","อายุ"],["gender","เพศ"],["role","บทบาท"],["status","สถานะ"],["faction","กลุ่ม/สังกัด"],["appearsIn","ปรากฏในเล่ม"]].map(([k,lbl]) => (
                  <div key={k}>
                    <label style={{fontSize:11,opacity:.5,display:"block",marginBottom:2}}>{lbl}</label>
                    {k==="role" ? (
                      <select value={draft[k]||""} onChange={e=>setDraft(d=>({...d,[k]:e.target.value}))} style={{width:"100%",padding:"6px 8px",background:`${theme.border}33`,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:13,color:theme.ink,outline:"none"}}>
                        {CHAR_ROLES.map(r=><option key={r}>{r}</option>)}
                      </select>
                    ) : k==="status" ? (
                      <select value={draft[k]||""} onChange={e=>setDraft(d=>({...d,[k]:e.target.value}))} style={{width:"100%",padding:"6px 8px",background:`${theme.border}33`,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:13,color:theme.ink,outline:"none"}}>
                        {Object.keys(STATUS_COLORS).map(s=><option key={s}>{s}</option>)}
                      </select>
                    ) : (
                      <input value={draft[k]||""} onChange={e=>setDraft(d=>({...d,[k]:e.target.value}))} style={{width:"100%",padding:"6px 8px",background:`${theme.border}33`,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:13,color:theme.ink,outline:"none"}} />
                    )}
                  </div>
                ))}
                <div style={{gridColumn:"1/-1"}}>
                  <label style={{fontSize:11,opacity:.5,display:"block",marginBottom:2}}>บันทึก / ลักษณะ</label>
                  <textarea value={draft.notes||""} onChange={e=>setDraft(d=>({...d,notes:e.target.value}))} style={{width:"100%",padding:"8px 10px",background:`${theme.border}33`,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:13,color:theme.ink,outline:"none",minHeight:100,resize:"vertical"}} />
                </div>
              </div>
            ) : (
              <div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
                  {[["อายุ",selChar.age||"-"],["เพศ",selChar.gender||"-"],["บทบาท",selChar.role||"-"],["กลุ่ม/สังกัด",selChar.faction||"-"],["ปรากฏในเล่ม",selChar.appearsIn||"-"],["ถูกกล่าวถึง",`${countMentions(selChar.name)} ครั้ง`]].map(([lbl,val],i) => (
                    <div key={i} style={{padding:"12px 14px",background:`${theme.border}33`,borderRadius:10}}>
                      <div style={{fontSize:10,opacity:.5,marginBottom:4}}>{lbl}</div>
                      <div style={{fontSize:14,fontWeight:600}}>{val}</div>
                    </div>
                  ))}
                </div>
                {selChar.notes && <div style={{padding:16,background:`${theme.border}22`,borderRadius:12,fontSize:13,lineHeight:1.7}}><div style={{fontSize:10,opacity:.5,marginBottom:8}}>📝 บันทึก</div>{selChar.notes}</div>}
                {/* V27: Character Mention Breakdown */}
                {(() => {
                  const mentionData = chapters
                    .map(c => {
                      const count = stripHtml(c.content||"").split(selChar.name).length - 1;
                      return { ch: c, count };
                    })
                    .filter(d => d.count > 0)
                    .sort((a, b) => b.count - a.count);
                  const totalMentions = mentionData.reduce((s, d) => s + d.count, 0);
                  if (mentionData.length === 0) return null;
                  const maxCount = mentionData[0]?.count || 1;
                  return (
                    <div style={{marginTop:16}}>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                        <div style={{fontSize:11,fontWeight:700,opacity:.45,textTransform:"uppercase",letterSpacing:".08em"}}>ปรากฏในบท</div>
                        <div style={{fontSize:11,opacity:.5}}>{totalMentions} ครั้ง · {mentionData.length} บท</div>
                      </div>
                      {/* Top-3 highlight */}
                      {mentionData.slice(0,3).length > 0 && (
                        <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
                          {mentionData.slice(0,3).map((d,i) => (
                            <div key={d.ch.id} style={{
                              padding:"4px 10px",
                              background: i===0 ? theme.accent : `${theme.accent}33`,
                              color: i===0 ? "#fff" : theme.accent,
                              borderRadius:20, fontSize:11, fontWeight:700,
                              display:"flex",alignItems:"center",gap:5,cursor:"pointer",
                            }}
                              onClick={()=>onMentionClick?.(d.ch.id)}
                              title={`${d.ch.title} — ${d.count} ครั้ง`}>
                              {i===0?"🥇":i===1?"🥈":"🥉"}
                              {d.count} ครั้ง
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Full breakdown table */}
                      <div style={{display:"flex",flexDirection:"column",gap:5,maxHeight:280,overflowY:"auto"}}>
                        {mentionData.map((d) => {
                          const pct = Math.round(d.count / totalMentions * 100);
                          const barW = Math.round(d.count / maxCount * 100);
                          return (
                            <div key={d.ch.id}
                              onClick={()=>onMentionClick?.(d.ch.id)}
                              style={{cursor:"pointer",padding:"6px 10px",background:`${theme.border}22`,borderRadius:8,transition:".12s"}}
                              onMouseEnter={e=>e.currentTarget.style.background=`${theme.accent}18`}
                              onMouseLeave={e=>e.currentTarget.style.background=`${theme.border}22`}>
                              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                                <span style={{fontSize:11,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,paddingRight:8}}>{d.ch.title}</span>
                                <span style={{fontSize:11,fontWeight:700,color:theme.accent,flexShrink:0}}>{d.count}×</span>
                                <span style={{fontSize:10,opacity:.4,flexShrink:0,marginLeft:6,minWidth:28,textAlign:"right"}}>{pct}%</span>
                              </div>
                              {/* Mini bar */}
                              <div style={{height:3,background:`${theme.border}44`,borderRadius:10,overflow:"hidden"}}>
                                <div style={{height:"100%",width:`${barW}%`,background:theme.accent,borderRadius:10,transition:".3s"}} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
);

// ─── TIMELINE PANEL ──────────────────────────────────────────────────────────
const TimelinePanel = memo(function TimelinePanel({ timeline, setTimeline, theme, showToast, chapters }) {
  const [editId, setEditId] = useState(null);
  const [draft, setDraft]   = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ year:"", title:"", desc:"", book:"" });

  function addItem() {
    if (!newItem.year || !newItem.title) { showToast("⚠️ กรุณากรอกปีและชื่อ"); return; }
    setTimeline(prev => [...prev, { id:newId(), ...newItem }]);
    setNewItem({ year:"", title:"", desc:"", book:"" });
    setShowAdd(false);
    showToast("➕ เพิ่มเหตุการณ์แล้ว");
  }

  function deleteItem(id) { setTimeline(prev => prev.filter(i => i.id !== id)); showToast("🗑 ลบแล้ว"); }

  function saveEdit() {
    setTimeline(prev => prev.map(i => i.id === editId ? {...draft} : i));
    setEditId(null); showToast("✅ บันทึกแล้ว");
  }

  return (
    <div style={{flex:1,overflow:"auto",padding:32,background:theme.bg}}>
      <div style={{maxWidth:720,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <div>
            <h2 style={{fontSize:20,fontWeight:800,marginBottom:4}}>⏳ Timeline</h2>
            <div style={{fontSize:13,opacity:.5}}>{timeline.length} เหตุการณ์</div>
          </div>
          <button onClick={()=>setShowAdd(true)} style={{padding:"8px 20px",background:theme.accent,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer"}}>+ เพิ่มเหตุการณ์</button>
        </div>

        {showAdd && (
          <div style={{padding:20,background:theme.panel,border:`1px solid ${theme.border}`,borderRadius:14,marginBottom:24}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:14}}>➕ เพิ่มเหตุการณ์ใหม่</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:10,marginBottom:10}}>
              {[["year","ปี/ช่วงเวลา","ปี 14..."],["title","ชื่อเหตุการณ์","ชื่อเหตุการณ์..."]].map(([k,lbl,ph])=>(
                <div key={k}>
                  <label style={{fontSize:10,opacity:.5,display:"block",marginBottom:2}}>{lbl}</label>
                  <input value={newItem[k]} onChange={e=>setNewItem(n=>({...n,[k]:e.target.value}))} placeholder={ph}
                    style={{width:"100%",padding:"6px 8px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:13,color:theme.ink,outline:"none"}} />
                </div>
              ))}
            </div>
            <div style={{marginBottom:10}}>
              <label style={{fontSize:10,opacity:.5,display:"block",marginBottom:2}}>รายละเอียด</label>
              <textarea value={newItem.desc} onChange={e=>setNewItem(n=>({...n,desc:e.target.value}))} placeholder="รายละเอียด..."
                style={{width:"100%",padding:"6px 8px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:13,color:theme.ink,outline:"none",minHeight:70,resize:"vertical"}} />
            </div>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:10,opacity:.5,display:"block",marginBottom:2}}>เชื่อมกับเล่ม/บท</label>
              <input value={newItem.book} onChange={e=>setNewItem(n=>({...n,book:e.target.value}))} placeholder="เล่ม 1, เล่ม 2..."
                style={{width:"100%",padding:"6px 8px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:13,color:theme.ink,outline:"none"}} />
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={addItem} style={{padding:"7px 20px",background:theme.accent,color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer"}}>➕ เพิ่ม</button>
              <button onClick={()=>setShowAdd(false)} className="btn" style={{padding:"7px 14px",fontSize:13}}>ยกเลิก</button>
            </div>
          </div>
        )}

        <div style={{paddingLeft:20}}>
          {timeline.map((item,i) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-dot" style={{background:item.book?theme.accent:theme.border,color:item.book?"#fff":theme.ink}}>{i+1}</div>
              <div style={{flex:1,paddingTop:4}}>
                {editId===item.id ? (
                  <div style={{padding:16,background:theme.panel,border:`1px solid ${theme.border}`,borderRadius:12}}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:8,marginBottom:8}}>
                      {["year","title"].map(k=>(
                        <input key={k} value={draft[k]||""} onChange={e=>setDraft(d=>({...d,[k]:e.target.value}))} placeholder={k==="year"?"ปี":"ชื่อ"}
                          style={{padding:"5px 8px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:6,fontSize:12,color:theme.ink,outline:"none"}} />
                      ))}
                    </div>
                    <textarea value={draft.desc||""} onChange={e=>setDraft(d=>({...d,desc:e.target.value}))} placeholder="รายละเอียด..."
                      style={{width:"100%",padding:"5px 8px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:6,fontSize:12,color:theme.ink,outline:"none",minHeight:60,resize:"vertical",marginBottom:8}} />
                    <input value={draft.book||""} onChange={e=>setDraft(d=>({...d,book:e.target.value}))} placeholder="เล่ม/บท..."
                      style={{width:"100%",padding:"5px 8px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:6,fontSize:12,color:theme.ink,outline:"none",marginBottom:8}} />
                    <div style={{display:"flex",gap:6}}>
                      <button onClick={saveEdit} style={{padding:"5px 14px",background:"#22c55e",color:"#fff",border:"none",borderRadius:6,fontSize:12,cursor:"pointer",fontWeight:600}}>✅ บันทึก</button>
                      <button onClick={()=>setEditId(null)} className="btn" style={{padding:"5px 10px",fontSize:12}}>ยกเลิก</button>
                    </div>
                  </div>
                ) : (
                  <div style={{padding:"14px 16px",background:theme.panel,border:`1px solid ${theme.border}`,borderRadius:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                      <div>
                        <span style={{fontSize:11,fontWeight:700,color:theme.accent,marginRight:10}}>{item.year}</span>
                        <span style={{fontSize:14,fontWeight:700}}>{item.title}</span>
                      </div>
                      <div style={{display:"flex",gap:4}}>
                        <button className="btn" style={{padding:"3px 7px",fontSize:11}} onClick={()=>{setEditId(item.id);setDraft({...item});}}>✏</button>
                        <button className="btn" style={{padding:"3px 7px",fontSize:11,color:"#ef4444",borderColor:"#ef444444"}} onClick={()=>deleteItem(item.id)}>🗑</button>
                      </div>
                    </div>
                    {item.desc && <div style={{fontSize:12,opacity:.65,lineHeight:1.6,marginBottom:6}}>{item.desc}</div>}
                    {item.book && <span style={{padding:"2px 8px",background:`${theme.accent}22`,color:theme.accent,borderRadius:20,fontSize:10,fontWeight:600}}>📖 {item.book}</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {timeline.length===0 && <div style={{textAlign:"center",opacity:.35,padding:48}}><div style={{fontSize:40,marginBottom:8}}>⏳</div><div>ยังไม่มีเหตุการณ์</div></div>}
      </div>
    </div>
  );
}
);

// ─── WORLD BIBLE PANEL ───────────────────────────────────────────────────────
const WorldBiblePanel = memo(function WorldBiblePanel({ world, setWorld, theme, showToast }) {
  const [activeSection, setActiveSection] = useState("locations");
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState({});

  const sections = [
    { id:"locations",     icon:"🗺", label:"Locations",      nameKey:"name", fields:[["name","ชื่อสถานที่"],["type","ประเภท"],["desc","คำอธิบาย"]], renderBadge:i=>i.type },
    { id:"organizations", icon:"🏛", label:"Organizations",  nameKey:"name", fields:[["name","ชื่อองค์กร"],["alignment","ฝ่าย"],["desc","คำอธิบาย"]], renderBadge:i=>i.alignment },
    { id:"lore",          icon:"📜", label:"Lore & Rules",   nameKey:"title", fields:[["title","ชื่อ"],["desc","รายละเอียด"]], renderBadge:()=>null },
  ];

  const sec = sections.find(s => s.id === activeSection);
  const items = world[activeSection] || [];

  function addItem() {
    const blank = Object.fromEntries(sec.fields.map(([k])=>[k,""]));
    blank.id = newId();
    setWorld(w => ({ ...w, [activeSection]: [...(w[activeSection]||[]), blank] }));
    setEditId(blank.id); setDraft({...blank});
    showToast("➕ เพิ่มข้อมูลแล้ว");
  }

  function deleteItem(id) {
    setWorld(w => ({ ...w, [activeSection]: (w[activeSection]||[]).filter(i => i.id !== id) }));
    if (editId===id) setEditId(null);
    showToast("🗑 ลบแล้ว");
  }

  function saveEdit() {
    setWorld(w => ({ ...w, [activeSection]: (w[activeSection]||[]).map(i => i.id===editId ? {...draft} : i) }));
    setEditId(null); showToast("✅ บันทึกแล้ว");
  }

  return (
    <div style={{flex:1,display:"flex",overflow:"hidden",background:theme.bg}}>
      <div style={{width:280,background:theme.panel,borderRight:`1px solid ${theme.border}`,display:"flex",flexDirection:"column"}}>
        <div style={{padding:"12px 12px 8px",borderBottom:`1px solid ${theme.border}`}}>
          <div style={{fontWeight:800,fontSize:14,marginBottom:10}}>🌍 World Bible</div>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {sections.map(s => (
              <button key={s.id} onClick={()=>{setActiveSection(s.id);setEditId(null);}}
                style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",border:`1px solid ${activeSection===s.id?theme.accent:theme.border}`,borderRadius:8,background:activeSection===s.id?`${theme.accent}22`:"transparent",color:activeSection===s.id?theme.accent:theme.ink,cursor:"pointer",fontSize:13,fontWeight:activeSection===s.id?700:400,transition:".15s"}}>
                <span>{s.icon}</span><span>{s.label}</span>
                <span style={{marginLeft:"auto",fontSize:11,opacity:.5}}>{(world[s.id]||[]).length}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"8px 10px"}}>
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}>
            <button onClick={addItem} style={{padding:"5px 12px",background:theme.accent,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer"}}>+ เพิ่ม</button>
          </div>
          {items.map(item => (
            <div key={item.id} className="world-card" style={{marginBottom:8,borderColor:editId===item.id?theme.accent:theme.border}} onClick={()=>{setEditId(item.id);setDraft({...item});}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                <div>
                  <div style={{fontWeight:700,fontSize:14}}>{item[sec.nameKey]||"-"}</div>
                  {sec.renderBadge(item) && <span style={{padding:"1px 8px",background:`${theme.accent}22`,color:theme.accent,borderRadius:20,fontSize:10,fontWeight:600}}>{sec.renderBadge(item)}</span>}
                </div>
                <div style={{display:"flex",gap:4}}>
                  <button onClick={(e)=>{e.stopPropagation();setEditId(item.id);setDraft({...item});}} style={{padding:"3px 7px",border:`1px solid ${theme.border}`,background:"transparent",borderRadius:6,fontSize:11,cursor:"pointer",color:theme.ink}}>✏</button>
                  <button onClick={(e)=>{e.stopPropagation();deleteItem(item.id);}} style={{padding:"3px 7px",border:"1px solid #ef444444",background:"transparent",borderRadius:6,fontSize:11,cursor:"pointer",color:"#ef4444"}}>🗑</button>
                </div>
              </div>
              {item.desc && <div style={{fontSize:12,opacity:.65,lineHeight:1.6}}>{item.desc}</div>}
            </div>
          ))}
          {items.length===0 && <div style={{textAlign:"center",opacity:.35,padding:48}}><div style={{fontSize:36,marginBottom:8}}>{sec.icon}</div><div style={{fontSize:14}}>ยังไม่มีข้อมูล</div></div>}
        </div>
      </div>

      <div style={{flex:1,overflow:"auto",padding:28}}>
        {editId ? (
          <div style={{maxWidth:580}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{fontSize:17,fontWeight:800}}>✏ แก้ไข {sec.label}</div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={saveEdit} style={{padding:"7px 16px",background:"#22c55e",color:"#fff",border:"none",borderRadius:8,fontSize:13,cursor:"pointer",fontWeight:600}}>✅ บันทึก</button>
                <button onClick={()=>setEditId(null)} className="btn" style={{padding:"7px 12px",fontSize:13}}>ยกเลิก</button>
              </div>
            </div>
            {sec.fields.map(([k,lbl]) => (
              <div key={k} style={{marginBottom:12}}>
                <label style={{fontSize:11,opacity:.55,display:"block",marginBottom:4}}>{lbl}</label>
                {k==="desc" ? (
                  <textarea value={draft[k]||""} onChange={e=>setDraft(d=>({...d,[k]:e.target.value}))} style={{width:"100%",padding:"8px 10px",background:`${theme.border}33`,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:13,color:theme.ink,outline:"none",minHeight:100,resize:"vertical"}} />
                ) : (
                  <input value={draft[k]||""} onChange={e=>setDraft(d=>({...d,[k]:e.target.value}))} style={{width:"100%",padding:"8px 10px",background:`${theme.border}33`,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:13,color:theme.ink,outline:"none"}} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",opacity:.3}}>
            <div style={{fontSize:48,marginBottom:12}}>{sec.icon}</div>
            <div style={{fontSize:15,fontWeight:700}}>{sec.label}</div>
            <div style={{fontSize:13,marginTop:4}}>เลือกรายการจาก Panel ซ้ายเพื่อแก้ไข</div>
          </div>
        )}
      </div>
    </div>
  );
}
);

// ─── AI TOOLS PANEL ──────────────────────────────────────────────────────────
const AIPanel = memo(function AIPanel({ theme, aiTab, setAiTab, aiInput, setAiInput, aiLoading, aiResult, setAiResult, onRun, book, chapters, characters, world, showToast, aiProvider, setAiProvider, aiKeys, setAiKeys, showAiSettings, setShowAiSettings }) {
  const [localKeys, setLocalKeys] = useState({ ...aiKeys });

  const PROVIDERS = [
    { id:"claude",  label:"Claude",  color:"#c4773a", icon:"◈", model:"claude-sonnet-4-20250514", link:"https://console.anthropic.com/keys" },
    { id:"gemini",  label:"Gemini",  color:"#4285f4", icon:"✦", model:"gemini-1.5-flash",          link:"https://aistudio.google.com/app/apikey" },
    { id:"gpt",     label:"GPT-4o",  color:"#10a37f", icon:"⬡", model:"gpt-4o-mini",               link:"https://platform.openai.com/api-keys" },
  ];

  const tabs = [
    { id:"character",   icon:"👤", label:"สร้างตัวละคร",   placeholder:"อธิบายตัวละครที่ต้องการ เช่น นักรบหญิงจากเมืองเหนือ..." },
    { id:"outline",     icon:"📋", label:"สร้าง Outline",  placeholder:"บทที่ต้องการเขียน เช่น บทที่ 6 การเผชิญหน้าครั้งแรก..." },
    { id:"synopsis",    icon:"📄", label:"Synopsis",       placeholder:"โปรเจกต์หรือเล่มที่ต้องการ Synopsis..." },
    { id:"continue",    icon:"✍️", label:"เขียนต่อ",       placeholder:"คำแนะนำ เช่น เพิ่มความตึงเครียด, ใส่ dialog มากขึ้น..." },
    { id:"dialogue",    icon:"💬", label:"บทสนทนา",        placeholder:"ตัวละครที่จะคุยกัน เช่น เซล่าและ Kael ทะเลาะกัน..." },
    { id:"consistency", icon:"⚠️", label:"ตรวจสอบ",        placeholder:"สิ่งที่ต้องการตรวจ เช่น อายุตัวละคร, สถานที่..." },
  ];

  const curProvider = PROVIDERS.find(p => p.id === aiProvider) || PROVIDERS[0];
  const hasKey = !!aiKeys[aiProvider];

  return (
    <div style={{flex:1,overflow:"auto",padding:32,background:theme.bg}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>

        {/* Header */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20}}>
          <div>
            <h2 style={{fontSize:20,fontWeight:800,marginBottom:4}}>🤖 AI Tools</h2>
            <div style={{fontSize:13,opacity:.5}}>ช่วยเขียนนิยายด้วย AI — เลือก Provider ที่มี Key</div>
          </div>
          <button onClick={()=>setShowAiSettings(true)} style={{padding:"7px 16px",border:`1px solid ${theme.border}`,borderRadius:10,background:"transparent",color:theme.ink,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
            ⚙️ API Keys
          </button>
        </div>

        {/* Provider selector */}
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          {PROVIDERS.map(p => {
            const active = aiProvider === p.id;
            const hasK = !!aiKeys[p.id];
            return (
              <button key={p.id} onClick={()=>setAiProvider(p.id)}
                style={{flex:1,padding:"10px 12px",border:`2px solid ${active?p.color:theme.border}`,borderRadius:12,background:active?`${p.color}18`:"transparent",color:active?p.color:theme.ink,cursor:"pointer",transition:".15s",textAlign:"center"}}>
                <div style={{fontSize:20,marginBottom:4}}>{p.icon}</div>
                <div style={{fontSize:13,fontWeight:active?700:500}}>{p.label}</div>
                <div style={{fontSize:10,marginTop:2,opacity:.6}}>{p.model}</div>
                <div style={{marginTop:4,fontSize:9,padding:"1px 6px",borderRadius:20,background:hasK?"#22c55e22":"#ef444422",color:hasK?"#22c55e":"#ef4444",display:"inline-block"}}>
                  {hasK?"✓ มี Key":"ยังไม่มี Key"}
                </div>
              </button>
            );
          })}
        </div>

        {/* Warning if no key */}
        {!hasKey && (
          <div style={{padding:"12px 16px",background:"#f59e0b22",border:"1px solid #f59e0b55",borderRadius:12,marginBottom:16,fontSize:13,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:20}}>⚠️</span>
            <div>
              <div style={{fontWeight:700,marginBottom:2}}>ยังไม่ได้ใส่ {curProvider.label} API Key</div>
              <div style={{opacity:.7,fontSize:12}}>กด "⚙️ API Keys" ด้านบนเพื่อใส่ Key · รับ Key ได้ที่ <a href={curProvider.link} target="_blank" rel="noopener noreferrer" style={{color:curProvider.color}}>{curProvider.link}</a></div>
            </div>
          </div>
        )}

        {/* Mode tabs */}
        <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
          {tabs.map(t => (
            <button key={t.id} className={"ai-tab-btn"+(aiTab===t.id?" active":"")} onClick={()=>{setAiTab(t.id);setAiResult("");}}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Context */}
        <div style={{padding:12,background:`${theme.border}22`,border:`1px dashed ${theme.border}`,borderRadius:10,marginBottom:14,fontSize:11,display:"flex",gap:12,flexWrap:"wrap"}}>
          <span style={{opacity:.5}}>📚 Context:</span>
          <span><strong>{book.title}</strong></span>
          <span style={{opacity:.6}}>แนว: {book.genre}</span>
          <span style={{opacity:.6}}>{chapters.length} บท</span>
          <span style={{opacity:.6}}>{characters.slice(0,3).map(c=>c.name).join(", ")}{characters.length>3?"...":""}</span>
        </div>

        {/* Input */}
        <div style={{marginBottom:14}}>
          <label style={{fontSize:11,opacity:.55,display:"block",marginBottom:5}}>
            {tabs.find(t=>t.id===aiTab)?.label} — คำสั่งเพิ่มเติม (ไม่บังคับ)
          </label>
          <textarea value={aiInput} onChange={e=>setAiInput(e.target.value)}
            placeholder={tabs.find(t=>t.id===aiTab)?.placeholder||""}
            style={{width:"100%",padding:"12px 14px",background:`${theme.border}33`,border:`1px solid ${theme.border}`,borderRadius:10,fontSize:13,color:theme.ink,outline:"none",minHeight:80,resize:"vertical",lineHeight:1.7}} />
        </div>

        <button onClick={onRun} disabled={aiLoading}
          style={{padding:"10px 28px",background:aiLoading?"#888":curProvider.color,color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:700,cursor:aiLoading?"not-allowed":"pointer",marginBottom:20,display:"flex",alignItems:"center",gap:8,opacity:hasKey?1:.7}}>
          {aiLoading
            ? <><span style={{display:"inline-block",animation:"spin 1s linear infinite"}}>⟳</span> กำลังประมวลผล...</>
            : <><span>{curProvider.icon}</span> Run {curProvider.label}</>
          }
        </button>

        {/* Result */}
        {aiResult && (
          <div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
              <div style={{fontSize:12,fontWeight:700,opacity:.55,display:"flex",alignItems:"center",gap:6}}>
                <span style={{color:curProvider.color}}>{curProvider.icon}</span> ผลลัพธ์จาก {curProvider.label}
              </div>
              <button onClick={()=>{navigator.clipboard.writeText(aiResult);showToast("📋 Copy แล้ว");}}
                style={{padding:"4px 12px",border:`1px solid ${theme.border}`,background:"transparent",borderRadius:6,fontSize:11,cursor:"pointer",color:theme.ink}}>📋 Copy</button>
            </div>
            <div className="ai-result-box">{aiResult}</div>
          </div>
        )}
      </div>

      {/* API Key Settings Modal */}
      {showAiSettings && (
        <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget){setShowAiSettings(false);}}}>
          <div className="modal-box fade-in" style={{maxWidth:520}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <div style={{fontWeight:800,fontSize:17}}>⚙️ API Keys</div>
              <button className="btn" onClick={()=>setShowAiSettings(false)}>×</button>
            </div>
            <div style={{fontSize:12,opacity:.6,marginBottom:20,lineHeight:1.7,padding:"10px 14px",background:`${theme.border}22`,borderRadius:10}}>
              ⚠️ Key เก็บใน <strong>sessionStorage</strong> — ล้างอัตโนมัติเมื่อปิดแท็บ ไม่ได้ส่งไปที่อื่น<br/>
              🔐 เพื่อความปลอดภัยสูงสุด: ใช้ Backend Proxy แทนการใส่ Key โดยตรง<br/>
              ใช้ได้กับ API ที่รองรับ CORS จาก Browser โดยตรง
            </div>
            {PROVIDERS.map(p => (
              <div key={p.id} style={{marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <span style={{fontSize:18,color:p.color}}>{p.icon}</span>
                  <span style={{fontWeight:700,fontSize:14}}>{p.label}</span>
                  <span style={{fontSize:11,opacity:.5}}>{p.model}</span>
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    style={{marginLeft:"auto",fontSize:11,color:p.color,textDecoration:"none",opacity:.8}}>รับ Key →</a>
                </div>
                <div style={{position:"relative"}}>
                  <input
                    type="password"
                    value={localKeys[p.id]||""}
                    onChange={e=>setLocalKeys(k=>({...k,[p.id]:e.target.value}))}
                    placeholder={`${p.label} API Key...`}
                    style={{width:"100%",padding:"8px 12px",background:`${theme.border}33`,border:`1px solid ${localKeys[p.id]?"#22c55e55":theme.border}`,borderRadius:8,fontSize:13,color:theme.ink,outline:"none"}}
                  />
                  {localKeys[p.id] && <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",fontSize:12,color:"#22c55e"}}>✓</span>}
                </div>
              </div>
            ))}
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <button className="accent-btn" onClick={()=>{setAiKeys(localKeys);showToast("✅ บันทึก Key แล้ว");setShowAiSettings(false);}}>✅ บันทึก</button>
              <button className="btn" style={{padding:"7px 14px",fontSize:13}} onClick={()=>{setLocalKeys({claude:"",gemini:"",gpt:""});setAiKeys({claude:"",gemini:"",gpt:""});showToast("🗑 ล้าง Keys แล้ว");}}>🗑 ล้างทั้งหมด</button>
              <button className="btn" style={{padding:"7px 14px",fontSize:13}} onClick={()=>setShowAiSettings(false)}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
);


// ─── SNAPSHOT PANEL ──────────────────────────────────────────────────────────
const SnapshotPanel = memo(function SnapshotPanel({ snapshots, onSave, onRestore, onDelete, onClose, theme }) {
  const [label, setLabel] = useState("");

  return (
    <div style={{position:"fixed",top:0,right:0,bottom:0,width:380,background:theme.panel,borderLeft:`1px solid ${theme.border}`,zIndex:500,display:"flex",flexDirection:"column",boxShadow:"-8px 0 32px #0003"}}>
      <div style={{padding:"16px 18px",borderBottom:`1px solid ${theme.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontWeight:800,fontSize:15}}>📸 Version History</div>
          <div style={{fontSize:11,opacity:.5,marginTop:2}}>{snapshots.length} snapshots (สูงสุด 20)</div>
        </div>
        <button onClick={onClose} style={{padding:"4px 10px",border:`1px solid ${theme.border}`,borderRadius:8,background:"transparent",color:theme.ink,cursor:"pointer",fontSize:13}}>×</button>
      </div>

      {/* Manual save */}
      <div style={{padding:"14px 18px",borderBottom:`1px solid ${theme.border}`}}>
        <div style={{fontSize:11,opacity:.55,marginBottom:6}}>บันทึก Snapshot ตอนนี้</div>
        <div style={{display:"flex",gap:8}}>
          <input value={label} onChange={e=>setLabel(e.target.value)} placeholder="ชื่อ snapshot (ไม่บังคับ)..."
            style={{flex:1,padding:"6px 10px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:12,color:theme.ink,outline:"none"}} />
          <button onClick={()=>{onSave(label);setLabel("");}}
            style={{padding:"6px 14px",background:theme.accent,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
            📸 Save
          </button>
        </div>
      </div>

      {/* Snapshot list */}
      <div style={{flex:1,overflowY:"auto",padding:"10px 14px"}}>
        {snapshots.length === 0 ? (
          <div style={{opacity:.4,fontSize:13,textAlign:"center",padding:32}}>ยังไม่มี Snapshot<br/>กด Save เพื่อบันทึกครั้งแรก</div>
        ) : snapshots.map((s, i) => (
          <div key={s.id} style={{padding:"12px 14px",marginBottom:10,background:`${theme.border}22`,borderRadius:12,border:`1px solid ${theme.border}`}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:6}}>
              <div>
                <div style={{fontWeight:700,fontSize:13}}>{s.label}</div>
                <div style={{fontSize:10,opacity:.5,marginTop:2}}>
                  {new Date(s.savedAt).toLocaleString("th-TH")}
                </div>
              </div>
              {i === 0 && <span style={{fontSize:9,padding:"2px 7px",background:`${theme.accent}22`,color:theme.accent,borderRadius:20,fontWeight:700}}>ล่าสุด</span>}
            </div>
            {s.data?.chapters && (
              <div style={{fontSize:11,opacity:.5,marginBottom:8}}>{s.data.chapters.length} บท · {s.data.characters?.length||0} ตัวละคร</div>
            )}
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>onRestore(s)}
                style={{flex:1,padding:"5px 10px",background:theme.accent,color:"#fff",border:"none",borderRadius:8,fontSize:11,fontWeight:600,cursor:"pointer"}}>
                ⏮ Restore
              </button>
              <button onClick={()=>onDelete(s.id)}
                style={{padding:"5px 10px",background:"transparent",color:"#ef4444",border:"1px solid #ef444444",borderRadius:8,fontSize:11,cursor:"pointer"}}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// ─── SCENE BOARD ─────────────────────────────────────────────────────────────
const SCENE_STATUSES = [
  { id:"draft",    label:"📝 Draft",    color:"#6b7280" },
  { id:"writing",  label:"✍️ Writing",  color:"#3b82f6" },
  { id:"revision", label:"🔄 Revision", color:"#f59e0b" },
  { id:"done",     label:"✅ Done",     color:"#22c55e" },
];

const SceneBoard = memo(function SceneBoard({ scenes, chapters, theme, onAdd, onUpdate, onDelete, showToast }) {
  const [editId, setEditId]   = useState(null);
  const [draft, setDraft]     = useState(null);
  const [dragScene, setDragScene] = useState(null);

  function startEdit(s) { setEditId(s.id); setDraft({...s}); }
  function saveEdit() {
    onUpdate(draft.id, draft);
    setEditId(null);
    showToast("✅ บันทึก Scene แล้ว");
  }

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",background:theme.bg}}>
      {/* Header */}
      <div style={{padding:"14px 20px",borderBottom:`1px solid ${theme.border}`,display:"flex",alignItems:"center",gap:12}}>
        <div style={{fontWeight:800,fontSize:16}}>🎬 Scene Board</div>
        <div style={{fontSize:12,opacity:.5}}>{scenes.length} scenes</div>
        <button onClick={()=>onAdd("draft")}
          style={{marginLeft:"auto",padding:"6px 16px",background:theme.accent,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer"}}>
          + เพิ่ม Scene
        </button>
      </div>

      {/* Kanban columns */}
      <div style={{flex:1,display:"flex",gap:0,overflowX:"auto",overflowY:"hidden"}}>
        {SCENE_STATUSES.map(col => {
          const colScenes = scenes.filter(s => s.status === col.id);
          return (
            <div key={col.id}
              onDragOver={e=>e.preventDefault()}
              onDrop={()=>{ if(dragScene) { onUpdate(dragScene, {status:col.id}); setDragScene(null); } }}
              style={{flex:"0 0 280px",display:"flex",flexDirection:"column",borderRight:`1px solid ${theme.border}`,background:theme.panel}}>
              {/* Column header */}
              <div style={{padding:"12px 14px",borderBottom:`1px solid ${theme.border}`,display:"flex",alignItems:"center",gap:8}}>
                <span style={{width:8,height:8,borderRadius:"50%",background:col.color,display:"inline-block"}}/>
                <span style={{fontWeight:700,fontSize:13}}>{col.label}</span>
                <span style={{marginLeft:"auto",fontSize:11,opacity:.5,background:`${theme.border}55`,borderRadius:20,padding:"1px 8px"}}>{colScenes.length}</span>
              </div>
              {/* Cards */}
              <div style={{flex:1,overflowY:"auto",padding:"10px 10px"}}>
                {colScenes.map(s => (
                  <div key={s.id} draggable
                    onDragStart={()=>setDragScene(s.id)}
                    onDragEnd={()=>setDragScene(null)}
                    style={{padding:"12px 14px",marginBottom:10,background:theme.bg,border:`1px solid ${s.id===editId?theme.accent:theme.border}`,borderRadius:10,cursor:"grab",transition:".15s"}}>
                    {editId === s.id && draft ? (
                      <div>
                        <input value={draft.title} onChange={e=>setDraft(d=>({...d,title:e.target.value}))}
                          style={{width:"100%",padding:"5px 8px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:6,fontSize:12,color:theme.ink,outline:"none",marginBottom:6}}/>
                        <textarea value={draft.desc} onChange={e=>setDraft(d=>({...d,desc:e.target.value}))} rows={2}
                          placeholder="คำอธิบาย..."
                          style={{width:"100%",padding:"5px 8px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:6,fontSize:11,color:theme.ink,outline:"none",resize:"none",marginBottom:6}}/>
                        <select value={draft.chapterId||""} onChange={e=>setDraft(d=>({...d,chapterId:e.target.value}))}
                          style={{width:"100%",padding:"4px 8px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:6,fontSize:11,color:theme.ink,outline:"none",marginBottom:8}}>
                          <option value="">— ไม่ระบุบท —</option>
                          {chapters.map(c=><option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                        <div style={{display:"flex",gap:5}}>
                          <button onClick={saveEdit} style={{flex:1,padding:"4px",background:"#22c55e",color:"#fff",border:"none",borderRadius:6,fontSize:11,cursor:"pointer",fontWeight:600}}>✅</button>
                          <button onClick={()=>setEditId(null)} style={{padding:"4px 8px",background:"transparent",border:`1px solid ${theme.border}`,borderRadius:6,fontSize:11,color:theme.ink,cursor:"pointer"}}>✕</button>
                          <button onClick={()=>{onDelete(s.id);setEditId(null);}} style={{padding:"4px 8px",background:"transparent",color:"#ef4444",border:"1px solid #ef444433",borderRadius:6,fontSize:11,cursor:"pointer"}}>🗑</button>
                        </div>
                      </div>
                    ) : (
                      <div onClick={()=>startEdit(s)}>
                        <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{s.title||"(ไม่มีชื่อ)"}</div>
                        {s.desc && <div style={{fontSize:11,opacity:.55,marginBottom:6,lineHeight:1.5}}>{s.desc}</div>}
                        {s.chapterId && chapters.find(c=>c.id===s.chapterId) && (
                          <div style={{fontSize:10,padding:"2px 8px",background:`${theme.accent}22`,color:theme.accent,borderRadius:20,display:"inline-block"}}>
                            📑 {chapters.find(c=>c.id===s.chapterId)?.title}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {/* Drop zone when column empty */}
                {colScenes.length===0 && (
                  <div style={{border:`2px dashed ${theme.border}`,borderRadius:10,padding:20,textAlign:"center",opacity:.35,fontSize:12}}>
                    ลาก Scene มาวางที่นี่
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

// ─── CHARACTER RELATIONSHIP GRAPH ────────────────────────────────────────────
const REL_TYPES = [
  { id:"เพื่อน",      color:"#22c55e" },
  { id:"ศัตรู",       color:"#ef4444" },
  { id:"ครอบครัว",    color:"#3b82f6" },
  { id:"รัก",         color:"#ec4899" },
  { id:"พี่เลี้ยง",   color:"#f59e0b" },
  { id:"ทีมงาน",      color:"#8b5cf6" },
  { id:"คู่แข่ง",     color:"#f97316" },
  { id:"เป็นกลาง",    color:"#6b7280" },
];

const CharRelationshipGraph = memo(function CharRelationshipGraph({ characters, relationships, onAdd, onDelete, onUpdate, theme }) {
  const [adding, setAdding]   = useState(false);
  const [fromId, setFromId]   = useState("");
  const [toId, setToId]       = useState("");
  const [relType, setRelType] = useState("เพื่อน");
  const [relDesc, setRelDesc] = useState("");
  const [editId, setEditId]   = useState(null);
  const [editDraft, setEditDraft] = useState(null);

  const svgW = 600, svgH = 380, cx = svgW/2, cy = svgH/2, r = 150;
  const n = characters.length;

  // Position characters in a circle
  const positions = characters.map((c, i) => {
    const angle = (2 * Math.PI * i / Math.max(n,1)) - Math.PI/2;
    return { id:c.id, name:c.name, color:c.color||theme.accent, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  const posMap = Object.fromEntries(positions.map(p=>[p.id, p]));

  function submitAdd() {
    if (!fromId || !toId || fromId===toId) return;
    onAdd(fromId, toId, relType, relDesc);
    setAdding(false); setFromId(""); setToId(""); setRelType("เพื่อน"); setRelDesc("");
    return;
  }

  return (
    <div style={{padding:24,flex:1,overflow:"auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <div style={{fontWeight:800,fontSize:15}}>🕸 Relationship Graph</div>
        <button onClick={()=>setAdding(a=>!a)}
          style={{padding:"5px 14px",background:adding?`${theme.border}55`:theme.accent,color:adding?theme.ink:"#fff",border:`1px solid ${adding?theme.border:theme.accent}`,borderRadius:8,fontSize:12,cursor:"pointer",fontWeight:600}}>
          {adding?"✕ ยกเลิก":"+ เพิ่ม Relationship"}
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div style={{padding:16,background:`${theme.border}22`,borderRadius:12,marginBottom:16,display:"flex",gap:10,flexWrap:"wrap",alignItems:"flex-end"}}>
          <div>
            <div style={{fontSize:11,opacity:.55,marginBottom:4}}>จาก</div>
            <select value={fromId} onChange={e=>setFromId(e.target.value)}
              style={{padding:"6px 8px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:12,color:theme.ink,outline:"none"}}>
              <option value="">เลือกตัวละคร...</option>
              {characters.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <div style={{fontSize:11,opacity:.55,marginBottom:4}}>ความสัมพันธ์</div>
            <select value={relType} onChange={e=>setRelType(e.target.value)}
              style={{padding:"6px 8px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:12,color:theme.ink,outline:"none"}}>
              {REL_TYPES.map(t=><option key={t.id}>{t.id}</option>)}
            </select>
          </div>
          <div>
            <div style={{fontSize:11,opacity:.55,marginBottom:4}}>ถึง</div>
            <select value={toId} onChange={e=>setToId(e.target.value)}
              style={{padding:"6px 8px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:12,color:theme.ink,outline:"none"}}>
              <option value="">เลือกตัวละคร...</option>
              {characters.filter(c=>c.id!==fromId).map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div style={{flex:1,minWidth:140}}>
            <div style={{fontSize:11,opacity:.55,marginBottom:4}}>คำอธิบาย (ไม่บังคับ)</div>
            <input value={relDesc} onChange={e=>setRelDesc(e.target.value)} placeholder="เช่น รู้จักมาตั้งแต่เด็ก..."
              style={{width:"100%",padding:"6px 8px",background:`${theme.border}44`,border:`1px solid ${theme.border}`,borderRadius:8,fontSize:12,color:theme.ink,outline:"none"}}/>
          </div>
          <button onClick={submitAdd}
            style={{padding:"7px 18px",background:theme.accent,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer"}}>➕ เพิ่ม</button>
        </div>
      )}

      {characters.length < 2 ? (
        <div style={{opacity:.4,fontSize:13,textAlign:"center",padding:40}}>ต้องมีตัวละครอย่างน้อย 2 คนเพื่อสร้าง Relationship</div>
      ) : (
        <>
          {/* SVG Graph */}
          <div style={{background:`${theme.border}22`,borderRadius:16,marginBottom:20,overflow:"hidden"}}>
            <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{display:"block",maxHeight:380}}>
              {/* Edges */}
              {relationships.map(rel => {
                const from = posMap[rel.fromId];
                const to   = posMap[rel.toId];
                if (!from || !to) return null;
                const relColor = REL_TYPES.find(t=>t.id===rel.type)?.color || "#888";
                const midX = (from.x+to.x)/2, midY = (from.y+to.y)/2;
                return (
                  <g key={rel.id}>
                    <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={relColor} strokeWidth="2" strokeOpacity=".7"/>
                    <text x={midX} y={midY-4} textAnchor="middle" fontSize="10" fill={relColor} fontWeight="600">{rel.type}</text>
                    {rel.desc && <text x={midX} y={midY+12} textAnchor="middle" fontSize="9" fill={relColor} opacity=".65">{rel.desc}</text>}
                  </g>
                );
              })}
              {/* Nodes */}
              {positions.map(p => (
                <g key={p.id}>
                  <circle cx={p.x} cy={p.y} r="22" fill={p.color} fillOpacity=".9" stroke={theme.bg} strokeWidth="3"/>
                  <text x={p.x} y={p.y+4} textAnchor="middle" fontSize="10" fill="#fff" fontWeight="700">
                    {p.name.length>5 ? p.name.slice(0,4)+"…" : p.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Relationship list */}
          {relationships.length > 0 && (
            <div>
              <div style={{fontSize:11,fontWeight:700,opacity:.45,textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>รายการ Relationships ({relationships.length})</div>
              {relationships.map(rel => {
                const from = characters.find(c=>c.id===rel.fromId);
                const to   = characters.find(c=>c.id===rel.toId);
                if (!from || !to) return null;
                const relColor = REL_TYPES.find(t=>t.id===rel.type)?.color || "#888";
                return (
                  <div key={rel.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:`${theme.border}22`,borderRadius:8,marginBottom:6}}>
                    <span style={{width:8,height:8,borderRadius:"50%",background:relColor,flexShrink:0,display:"inline-block"}}/>
                    <span style={{fontWeight:600,fontSize:13,flex:1}}>{from.name} <span style={{color:relColor,fontSize:11}}>— {rel.type} →</span> {to.name}</span>
                    {rel.desc && <span style={{fontSize:11,opacity:.55}}>{rel.desc}</span>}
                    <button onClick={()=>onDelete(rel.id)}
                      style={{padding:"2px 7px",background:"transparent",color:"#ef4444",border:"1px solid #ef444433",borderRadius:6,fontSize:11,cursor:"pointer"}}>×</button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
});

// ─── TEMPLATE PICKER (V10) ───────────────────────────────────────────────────
const EMPTY_CUSTOM_TPL = {
  icon: "📝", label: "", labelEn: "", desc: "", color: "#8b4513",
  category: "custom",
  settings: { font:"Sarabun", fontSize:15, lineHeight:185, layout:"a5", theme:"white" },
  book: { genre:"", targetAudience:"ทุกวัย", language:"ไทย" },
  chapters: [{ title:"บทที่ 1", content:"" }],
  writingGoal: 500,
};

const TemplatePicker = memo(function TemplatePicker({ theme, onClose, onSelect, LAYOUT_SIZES, series = [], onCreateSeries }) {
  const [activeCat, setActiveCat] = useState("all");
  const [selectedTpl, setSelectedTpl] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("a5");
  const [selectedSeriesId, setSelectedSeriesId] = useState("");
  const [showNewSeriesInline, setShowNewSeriesInline] = useState(false);
  const [newSeriesTitle, setNewSeriesTitle] = useState("");
  const [newSeriesColor, setNewSeriesColor] = useState("#8b4513");
  const [customTemplates, setCustomTemplates] = useState(() => loadCustomTemplates());
  const [showBuilder, setShowBuilder] = useState(false);
  const [builderDraft, setBuilderDraft] = useState({ ...EMPTY_CUSTOM_TPL, chapters: [{ title:"บทที่ 1", content:"" }] });
  const [editCustomId, setEditCustomId] = useState(null);

  const allTemplates = useMemo(() => [
    ...NOVEL_TEMPLATES_WITH_CAT,
    ...customTemplates.map(t => ({ ...t, category: "custom" })),
  ], [customTemplates]);

  const filtered = useMemo(() => {
    if (activeCat === "all") return allTemplates;
    if (activeCat === "custom") return allTemplates.filter(t => t.category === "custom");
    return allTemplates.filter(t => t.category === activeCat);
  }, [allTemplates, activeCat]);

  function openBuilder(tpl = null) {
    if (tpl) {
      setBuilderDraft({ ...tpl, chapters: tpl.chapters?.map(c => ({ ...c })) || [{ title:"บทที่ 1", content:"" }] });
      setEditCustomId(tpl.id);
    } else {
      setBuilderDraft({ ...EMPTY_CUSTOM_TPL, id: newId(), chapters: [{ title:"บทที่ 1", content:"" }] });
      setEditCustomId(null);
    }
    setShowBuilder(true);
  }

  function saveCustomTemplate() {
    if (!builderDraft.label.trim()) return;
    const tpl = { ...builderDraft, id: editCustomId || newId(), category: "custom" };
    let list;
    if (editCustomId) {
      list = customTemplates.map(t => t.id === editCustomId ? tpl : t);
    } else {
      list = [...customTemplates, tpl];
    }
    saveCustomTemplates(list);
    setCustomTemplates(list);
    setShowBuilder(false);
    setActiveCat("custom");
    setSelectedTpl(tpl);
  }

  function deleteCustomTemplate(id) {
    const list = customTemplates.filter(t => t.id !== id);
    saveCustomTemplates(list);
    setCustomTemplates(list);
    if (selectedTpl?.id === id) setSelectedTpl(null);
  }

  function addBuilderChapter() {
    setBuilderDraft(d => ({ ...d, chapters: [...d.chapters, { title:`บทที่ ${d.chapters.length+1}`, content:"" }] }));
  }
  function removeBuilderChapter(i) {
    setBuilderDraft(d => ({ ...d, chapters: d.chapters.filter((_,j) => j !== i) }));
  }
  function updateBuilderChapter(i, val) {
    setBuilderDraft(d => { const chaps = [...d.chapters]; chaps[i] = { ...chaps[i], title: val }; return { ...d, chapters: chaps }; });
  }

  const inputStyle = { width:"100%", padding:"7px 10px", background:`${theme.border}33`, border:`1px solid ${theme.border}`, borderRadius:8, fontSize:13, color:theme.ink, outline:"none", boxSizing:"border-box" };

  if (showBuilder) {
    return (
      <div className="modal-bg" onClick={e=>{ if(e.target===e.currentTarget) setShowBuilder(false); }}>
        <div className="fade-in" style={{background:theme.panel,borderRadius:16,padding:0,width:"min(580px,96vw)",maxHeight:"90vh",display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:"0 24px 64px #0005",border:`1px solid ${theme.border}`}}>
          <div style={{padding:"14px 20px 12px",borderBottom:`1px solid ${theme.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{fontWeight:800,fontSize:15}}>{editCustomId ? "✏️ แก้ไข Custom Template" : "⭐ สร้าง Custom Template"}</div>
            <button onClick={()=>setShowBuilder(false)} style={{width:28,height:28,border:`1px solid ${theme.border}`,borderRadius:8,background:"transparent",color:theme.ink,fontSize:14,cursor:"pointer",opacity:.6}}>×</button>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:12}}>
            <div style={{display:"grid",gridTemplateColumns:"60px 1fr 1fr",gap:10}}>
              <div>
                <div style={{fontSize:10,opacity:.5,marginBottom:4}}>Icon</div>
                <input value={builderDraft.icon} onChange={e=>setBuilderDraft(d=>({...d,icon:e.target.value}))} style={{...inputStyle,textAlign:"center",fontSize:20,padding:"5px"}} maxLength={4}/>
              </div>
              <div>
                <div style={{fontSize:10,opacity:.5,marginBottom:4}}>ชื่อ Template *</div>
                <input value={builderDraft.label} onChange={e=>setBuilderDraft(d=>({...d,label:e.target.value}))} placeholder="เช่น แวมไพร์โรแมนซ์" style={inputStyle}/>
              </div>
              <div>
                <div style={{fontSize:10,opacity:.5,marginBottom:4}}>สี (hex)</div>
                <div style={{display:"flex",gap:6}}>
                  <input type="color" value={builderDraft.color} onChange={e=>setBuilderDraft(d=>({...d,color:e.target.value}))} style={{width:36,height:34,border:"none",borderRadius:8,cursor:"pointer",background:"transparent",padding:2}}/>
                  <input value={builderDraft.color} onChange={e=>setBuilderDraft(d=>({...d,color:e.target.value}))} style={{...inputStyle,flex:1}}/>
                </div>
              </div>
            </div>
            <div>
              <div style={{fontSize:10,opacity:.5,marginBottom:4}}>คำอธิบาย</div>
              <input value={builderDraft.desc} onChange={e=>setBuilderDraft(d=>({...d,desc:e.target.value}))} placeholder="อธิบายแนวสั้นๆ..." style={inputStyle}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div>
                <div style={{fontSize:10,opacity:.5,marginBottom:4}}>แนว/Genre</div>
                <input value={builderDraft.book?.genre||""} onChange={e=>setBuilderDraft(d=>({...d,book:{...d.book,genre:e.target.value}}))} placeholder="เช่น แวมไพร์โรแมนซ์" style={inputStyle}/>
              </div>
              <div>
                <div style={{fontSize:10,opacity:.5,marginBottom:4}}>กลุ่มเป้าหมาย</div>
                <input value={builderDraft.book?.targetAudience||""} onChange={e=>setBuilderDraft(d=>({...d,book:{...d.book,targetAudience:e.target.value}}))} placeholder="ทุกวัย / ผู้ใหญ่..." style={inputStyle}/>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
              <div>
                <div style={{fontSize:10,opacity:.5,marginBottom:4}}>ฟอนต์</div>
                <select value={builderDraft.settings?.font||"Sarabun"} onChange={e=>setBuilderDraft(d=>({...d,settings:{...d.settings,font:e.target.value}}))}
                  style={{...inputStyle,cursor:"pointer"}}>
                  {["Sarabun","Noto Serif Thai","Kanit","Prompt","Charm","Mitr"].map(f=><option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <div style={{fontSize:10,opacity:.5,marginBottom:4}}>Theme</div>
                <select value={builderDraft.settings?.theme||"white"} onChange={e=>setBuilderDraft(d=>({...d,settings:{...d.settings,theme:e.target.value}}))}
                  style={{...inputStyle,cursor:"pointer"}}>
                  <option value="white">White</option>
                  <option value="sepia">Sepia/Warm</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div>
                <div style={{fontSize:10,opacity:.5,marginBottom:4}}>เป้าหมาย (คำ/วัน)</div>
                <input type="number" value={builderDraft.writingGoal||500} onChange={e=>setBuilderDraft(d=>({...d,writingGoal:Number(e.target.value)}))} min={100} max={5000} style={inputStyle}/>
              </div>
            </div>
            {/* Chapters */}
            <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                <div style={{fontSize:11,fontWeight:700,opacity:.5,textTransform:"uppercase",letterSpacing:".06em"}}>บทเริ่มต้น ({builderDraft.chapters.length})</div>
                <button onClick={addBuilderChapter} style={{padding:"2px 10px",background:theme.accent,color:"#fff",border:"none",borderRadius:6,fontSize:11,cursor:"pointer",fontWeight:600}}>+ เพิ่มบท</button>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {builderDraft.chapters.map((ch,i) => (
                  <div key={i} style={{display:"flex",gap:6,alignItems:"center"}}>
                    <span style={{fontSize:11,opacity:.4,width:22,flexShrink:0,textAlign:"right"}}>{i+1}.</span>
                    <input value={ch.title} onChange={e=>updateBuilderChapter(i,e.target.value)} style={{...inputStyle,flex:1}} placeholder={`บทที่ ${i+1}`}/>
                    {builderDraft.chapters.length > 1 && (
                      <button onClick={()=>removeBuilderChapter(i)} style={{padding:"2px 7px",background:"transparent",color:"#ef4444",border:"1px solid #ef444433",borderRadius:6,fontSize:11,cursor:"pointer"}}>×</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{padding:"12px 20px",borderTop:`1px solid ${theme.border}`,display:"flex",gap:8}}>
            <button onClick={saveCustomTemplate}
              disabled={!builderDraft.label.trim()}
              style={{flex:1,padding:"9px",background:builderDraft.label.trim()?theme.accent:"#9ca3af",color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:700,cursor:builderDraft.label.trim()?"pointer":"not-allowed"}}>
              ⭐ บันทึก Template
            </button>
            <button onClick={()=>setShowBuilder(false)} className="btn" style={{padding:"9px 16px",fontSize:13}}>ยกเลิก</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-bg" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="fade-in" style={{background:theme.panel,borderRadius:16,padding:0,width:"min(700px,96vw)",maxHeight:"88vh",display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:"0 24px 64px #0005",border:`1px solid ${theme.border}`}}>

        {/* Header */}
        <div style={{padding:"14px 20px 12px",borderBottom:`1px solid ${theme.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontWeight:800,fontSize:15,color:theme.ink}}>✨ เลือก Project Preset</div>
            <div style={{fontSize:11,opacity:.45,marginTop:2}}>แต่ละ Preset มาพร้อม World Bible + ตัวละคร + Layout ที่เหมาะสม</div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button onClick={()=>openBuilder()} style={{padding:"5px 12px",background:theme.accent,color:"#fff",border:"none",borderRadius:8,fontSize:11,fontWeight:600,cursor:"pointer"}}>⭐ Custom</button>
            <button onClick={onClose} style={{width:28,height:28,border:`1px solid ${theme.border}`,borderRadius:8,background:"transparent",color:theme.ink,fontSize:14,cursor:"pointer",opacity:.6,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          </div>
        </div>

        {/* Category filter */}
        <div style={{padding:"8px 16px",borderBottom:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap",background:`${theme.border}11`}}>
          {TEMPLATE_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={()=>setActiveCat(cat.id)}
              style={{padding:"4px 12px",borderRadius:20,border:`1px solid ${activeCat===cat.id?theme.accent:theme.border}`,background:activeCat===cat.id?theme.accent:"transparent",color:activeCat===cat.id?"#fff":theme.ink,fontSize:11,fontWeight:activeCat===cat.id?700:400,cursor:"pointer",transition:".12s"}}>
              {cat.icon} {cat.label}
              <span style={{marginLeft:5,opacity:.6,fontSize:10}}>
                ({cat.id==="all"?allTemplates.length:cat.id==="custom"?customTemplates.length:NOVEL_TEMPLATES_WITH_CAT.filter(t=>t.category===cat.id).length + (cat.id==="custom"?customTemplates.length:0)})
              </span>
            </button>
          ))}
        </div>

        {/* Template grid */}
        <div style={{flex:1,overflowY:"auto",padding:"12px 16px"}}>
          {filtered.length === 0 ? (
            <div style={{textAlign:"center",padding:"40px 0",opacity:.35}}>
              <div style={{fontSize:36,marginBottom:8}}>⭐</div>
              <div style={{fontSize:13}}>ยังไม่มี Custom Template</div>
              <div style={{fontSize:11,marginTop:4,opacity:.7}}>กด "⭐ Custom" ด้านบนเพื่อสร้าง</div>
            </div>
          ) : (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))",gap:8}}>
              {filtered.map(tpl => {
                const isCustom = tpl.category === "custom";
                const isSelected = selectedTpl?.id === tpl.id;
                const previewFont = tpl.settings?.font || "Sarabun";
                const previewSize = tpl.settings?.fontSize || 15;
                const previewLH   = tpl.settings?.lineHeight || 185;
                // ข้อความ preview ต่างกันตาม preset
                const PREVIEW_TEXTS = {
                  romance:    "หัวใจเต้นแรงขึ้น\nทุกครั้งที่เขายิ้ม",
                  fantasy:    "ดาบแห่งโชคชะตา\nส่องสว่างในความมืด",
                  scifi:      "System online.\nTarget: Kepler-7b",
                  dark_fantasy:"ไม่มีฮีโร่ในโลกนี้\nมีแค่การเลือก",
                  horror:     "เสียงนั้นมาจาก\nใต้บันไดอีกครั้ง",
                  thriller:   "เวลาเหลือ 30 วิ\nทางออกมีแค่หนึ่ง",
                  mystery:    "รอยเลือดบนพรม\nบอกความจริง",
                  isekai:     "[STATUS]\nLv.1 → Lv.99",
                  cultivation:"พลังภายในพุ่งพล่าน\nทะลุขีดจำกัด",
                  blank:      "เรื่องราวของคุณ\nเริ่มต้นที่นี่",
                };
                const previewText = PREVIEW_TEXTS[tpl.id] || (tpl.chapters?.[0]?.title?.slice(0,20) || "ข้อความตัวอย่าง");

                return (
                  <div key={tpl.id} style={{position:"relative"}}>
                    <button onClick={()=>setSelectedTpl(tpl)}
                      style={{
                        width:"100%", padding:0, textAlign:"left",
                        border:`2px solid ${isSelected ? tpl.color : theme.border}`,
                        borderRadius:12,
                        background: isSelected ? `${tpl.color}18` : theme.bg,
                        cursor:"pointer", transition:".15s", outline:"none",
                        boxShadow: isSelected ? `0 0 0 3px ${tpl.color}33` : `0 1px 4px #0001`,
                        overflow:"hidden",
                      }}>

                      {/* Typography preview strip */}
                      <div style={{
                        padding:"10px 12px 8px",
                        background: isSelected ? `${tpl.color}14` : `${theme.border}22`,
                        borderBottom:`1px solid ${isSelected ? tpl.color+"33" : theme.border}`,
                        minHeight:56,
                        display:"flex", alignItems:"center",
                      }}>
                        <div style={{
                          fontFamily:`'${previewFont}',sans-serif`,
                          fontSize: Math.min(previewSize - 3, 13),
                          lineHeight: previewLH / 100,
                          color: isSelected ? tpl.color : theme.ink,
                          opacity: isSelected ? 1 : 0.75,
                          whiteSpace:"pre-line",
                          overflow:"hidden",
                          display:"-webkit-box",
                          WebkitLineClamp:3,
                          WebkitBoxOrient:"vertical",
                          wordBreak:"break-word",
                        }}>
                          {previewText}
                        </div>
                      </div>

                      {/* Card footer */}
                      <div style={{padding:"7px 10px", display:"flex", alignItems:"center", gap:6}}>
                        <span style={{fontSize:16,lineHeight:1}}>{tpl.icon}</span>
                        <div style={{flex:1, overflow:"hidden"}}>
                          <div style={{fontWeight:700, fontSize:11, color: isSelected ? tpl.color : theme.ink, lineHeight:1.3, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{tpl.label}</div>
                          <div style={{fontSize:9, opacity:.4, marginTop:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{previewFont} · {previewSize}px</div>
                        </div>
                        {isCustom && <div style={{fontSize:8,padding:"1px 5px",background:`${tpl.color}33`,color:tpl.color,borderRadius:20,fontWeight:700,flexShrink:0}}>CUSTOM</div>}
                      </div>
                    </button>

                    {isCustom && (
                      <div style={{position:"absolute",top:4,right:4,display:"flex",gap:2}}>
                        <button onClick={e=>{e.stopPropagation();openBuilder(tpl);}} style={{width:18,height:18,background:theme.panel,border:`1px solid ${theme.border}`,borderRadius:4,fontSize:9,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:theme.ink,opacity:.7}}>✏</button>
                        <button onClick={e=>{e.stopPropagation();deleteCustomTemplate(tpl.id);}} style={{width:18,height:18,background:theme.panel,border:"1px solid #ef444455",borderRadius:4,fontSize:9,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#ef4444",opacity:.8}}>×</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Selected preset detail */}
          {selectedTpl && (
            <div style={{marginTop:12,padding:"14px 16px",background:`${selectedTpl.color}11`,border:`1px solid ${selectedTpl.color}44`,borderRadius:12,display:"flex",alignItems:"flex-start",gap:14}}>
              <div style={{fontSize:32,flexShrink:0,lineHeight:1}}>{selectedTpl.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:14,color:selectedTpl.color,marginBottom:4}}>
                  {selectedTpl.label}
                  {selectedTpl.labelEn && <span style={{fontSize:10,opacity:.55,fontWeight:400,marginLeft:6}}>({selectedTpl.labelEn})</span>}
                  {selectedTpl.category==="custom" && <span style={{fontSize:9,padding:"1px 6px",background:`${selectedTpl.color}33`,borderRadius:20,marginLeft:6,fontWeight:700}}>CUSTOM</span>}
                </div>
                {selectedTpl.desc && <div style={{fontSize:12,opacity:.7,lineHeight:1.6,marginBottom:8}}>{selectedTpl.desc}</div>}

                {/* Includes list — แสดงเฉพาะ preset ที่มี includes field */}
                {selectedTpl.includes && selectedTpl.includes.length > 0 && (
                  <div style={{marginBottom:10}}>
                    <div style={{fontSize:10,fontWeight:700,opacity:.5,textTransform:"uppercase",letterSpacing:".06em",marginBottom:5}}>Preset นี้มาพร้อมกับ</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                      {selectedTpl.includes.map((item, i) => (
                        <span key={i} style={{fontSize:10,padding:"2px 9px",background:`${selectedTpl.color}22`,color:selectedTpl.color,borderRadius:20,fontWeight:600,border:`1px solid ${selectedTpl.color}33`}}>
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{display:"flex",gap:12,fontSize:10,opacity:.5,flexWrap:"wrap"}}>
                  {(selectedTpl.chapters?.length||0) > 0 && <span>📑 {selectedTpl.chapters.length} บทเริ่มต้น</span>}
                  <span>🎯 {selectedTpl.writingGoal||500} คำ/วัน</span>
                  {selectedTpl.settings?.font && <span>🔤 {selectedTpl.settings.font}</span>}
                  {selectedTpl.book?.genre && <span>📚 {selectedTpl.book.genre}</span>}
                  {selectedTpl.book?.targetAudience && <span>👥 {selectedTpl.book.targetAudience}</span>}
                </div>
                {(selectedTpl.chapters?.length||0) > 0 && (
                  <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:4}}>
                    {selectedTpl.chapters.slice(0,4).map((ch,i)=>(
                      <span key={i} style={{fontSize:10,padding:"2px 8px",background:`${selectedTpl.color}22`,color:selectedTpl.color,borderRadius:20}}>{ch.title}</span>
                    ))}
                    {selectedTpl.chapters.length > 4 && <span style={{fontSize:10,opacity:.4}}>+{selectedTpl.chapters.length-4} บท</span>}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{padding:"12px 16px",borderTop:`1px solid ${theme.border}`,display:"flex",flexDirection:"column",gap:8}}>
          {/* Layout selector */}
          <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
            <span style={{fontSize:11,opacity:.5,fontWeight:700,whiteSpace:"nowrap"}}>ขนาดกระดาษ</span>
            {Object.entries(LAYOUT_SIZES||{}).map(([k,s]) => (
              <button key={k} onClick={()=>setSelectedLayout(k)}
                style={{padding:"3px 10px",fontSize:11,borderRadius:20,border:`1px solid ${selectedLayout===k?theme.accent:theme.border}`,background:selectedLayout===k?`${theme.accent}22`:"transparent",color:selectedLayout===k?theme.accent:theme.ink,cursor:"pointer",fontWeight:selectedLayout===k?700:400,transition:".1s"}}>
                {s.label}
              </button>
            ))}
          </div>

          {/* Series selector */}
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <span style={{fontSize:11,opacity:.5,fontWeight:700,whiteSpace:"nowrap"}}>📚 Series</span>
            <select value={selectedSeriesId} onChange={e=>{ if(e.target.value==="__new__"){ setShowNewSeriesInline(true); e.target.value=selectedSeriesId; } else { setSelectedSeriesId(e.target.value); setShowNewSeriesInline(false); } }}
              style={{flex:1,padding:"5px 8px",border:`1px solid ${theme.border}`,borderRadius:8,fontSize:12,background:theme.bg,color:theme.ink,outline:"none"}}>
              <option value="">— ไม่เพิ่มเข้า Series —</option>
              {series.map(s=>(
                <option key={s.id} value={s.id}>📚 {s.title}</option>
              ))}
              <option value="__new__">✨ สร้าง Series ใหม่...</option>
            </select>
            {selectedSeriesId && <button onClick={()=>setSelectedSeriesId("")} style={{background:"none",border:"none",cursor:"pointer",color:"#ef4444",fontSize:16,padding:0,lineHeight:1}}>×</button>}
          </div>

          {/* Inline new series form */}
          {showNewSeriesInline && (
            <div style={{display:"flex",gap:6,alignItems:"center",padding:"8px 10px",background:`${theme.border}22`,borderRadius:8,border:`1px dashed ${theme.accent}`}}>
              <span style={{fontSize:11,opacity:.6,whiteSpace:"nowrap"}}>ชื่อ Series:</span>
              <input value={newSeriesTitle} onChange={e=>setNewSeriesTitle(e.target.value)}
                placeholder="เช่น The Shattered Realms..." autoFocus
                style={{flex:1,padding:"5px 8px",border:`1px solid ${theme.border}`,borderRadius:6,fontSize:12,background:theme.bg,color:theme.ink,outline:"none"}} />
              <div style={{display:"flex",gap:4}}>
                {["#8b4513","#8b5cf6","#ec4899","#06b6d4","#22c55e","#f59e0b"].map(c=>(
                  <button key={c} onClick={()=>setNewSeriesColor(c)} style={{width:18,height:18,borderRadius:4,background:c,border:newSeriesColor===c?"2px solid #fff":"1px solid #0002",cursor:"pointer",padding:0}} />
                ))}
              </div>
              <button onClick={async ()=>{
                  if(!newSeriesTitle.trim()) return;
                  const s = await onCreateSeries(newSeriesTitle.trim(), "", newSeriesColor);
                  if(s){ setSelectedSeriesId(s.id); }
                  setShowNewSeriesInline(false);
                  setNewSeriesTitle("");
                }}
                style={{padding:"4px 12px",fontSize:11,borderRadius:6,background:theme.accent,color:"#fff",border:"none",cursor:"pointer",whiteSpace:"nowrap"}}>
                สร้าง
              </button>
              <button onClick={()=>{ setShowNewSeriesInline(false); setNewSeriesTitle(""); }}
                style={{background:"none",border:"none",cursor:"pointer",color:theme.ink,opacity:.4,fontSize:16,padding:0,lineHeight:1}}>×</button>
            </div>
          )}

          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <input value={projectName} onChange={e=>setProjectName(e.target.value)}
              placeholder={selectedTpl ? `ชื่อหนังสือ (${selectedTpl.label})...` : "เลือก Preset ก่อน..."}
              disabled={!selectedTpl}
              onKeyDown={e=>{ if(e.key==="Enter" && selectedTpl) onSelect(selectedTpl, projectName, selectedLayout, selectedSeriesId||null); }}
              style={{flex:1,padding:"8px 12px",border:`1px solid ${theme.border}`,borderRadius:8,fontSize:13,outline:"none",background:selectedTpl?theme.bg:`${theme.border}44`,color:theme.ink,opacity:selectedTpl?1:.5}} />
            <button className="accent-btn" disabled={!selectedTpl}
              onClick={()=>{ if(selectedTpl) onSelect(selectedTpl, projectName, selectedLayout, selectedSeriesId||null); }}
              style={{padding:"8px 20px",fontSize:13,opacity:selectedTpl?1:.4,cursor:selectedTpl?"pointer":"not-allowed",whiteSpace:"nowrap"}}>
              ✨ สร้างโปรเจกต์
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// ─── STORY DASHBOARD (V27) ────────────────────────────────────────────────────
const StoryDashboard = memo(function StoryDashboard({
  book, chapters, characters, timeline,
  totalWords, estPages, readMins,
  writingGoal, setWritingGoal,
  projectTarget, setProjectTarget,
  sessionWords, streakData,
  theme, showToast, wordCount, onOpenChapter,
}) {
  const accent = theme.accent;
  const border = theme.border;
  const ink    = theme.ink;
  const bg     = theme.bg;
  const panel  = theme.panel;

  // คำนวณ velocity chart (คำ/บท)
  const chapterWords = chapters.map(ch => ({ title: ch.title, wc: wordCount(ch.content), id: ch.id }));
  const maxWc = Math.max(...chapterWords.map(c => c.wc), 1);

  // Completion ring
  const targetWords   = projectTarget || 80000;
  const completionPct = Math.min(100, Math.round(totalWords / targetWords * 100));
  const circumference = 2 * Math.PI * 54; // r=54
  const strokeDash    = (completionPct / 100) * circumference;

  // Session goal pct
  const sessionGoalPct = Math.min(100, writingGoal > 0 ? Math.round(sessionWords / writingGoal * 100) : 0);

  // Recent chapters (บทที่มีเนื้อหา เรียงตาม wordcount)
  const activeChapters = [...chapterWords]
    .filter(c => c.wc > 0)
    .sort((a, b) => b.wc - a.wc)
    .slice(0, 5);

  const statCard = (val, lbl, color, emoji) => (
    <div style={{padding:"16px 14px",background:panel,borderRadius:14,border:`1px solid ${border}`,display:"flex",flexDirection:"column",gap:4}}>
      <div style={{fontSize:11,opacity:.5,display:"flex",alignItems:"center",gap:4}}>{emoji} {lbl}</div>
      <div style={{fontSize:22,fontWeight:800,color:color||ink,lineHeight:1}}>{val}</div>
    </div>
  );

  return (
    <div style={{flex:1,overflow:"auto",background:bg,padding:"24px 28px"}}>
      {/* Header */}
      <div style={{marginBottom:24}}>
        <div style={{fontSize:20,fontWeight:800,marginBottom:4}}>📈 Story Dashboard</div>
        <div style={{fontSize:13,opacity:.5}}>{book.title||"Untitled"} · ภาพรวมโปรเจกต์</div>
      </div>

      {/* ── Summary cards ── */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:24}}>
        {statCard(totalWords.toLocaleString(),   "คำทั้งหมด",  accent,    "✍️")}
        {statCard(chapters.length,               "บท",         ink,       "📑")}
        {statCard(characters.length,             "ตัวละคร",    ink,       "👤")}
        {statCard(`~${readMins} น.`,             "เวลาอ่าน",  ink,       "⏱")}
        {statCard(`🔥 ${streakData?.streak||0}`, "Streak วัน", "#f97316", "🔥")}
        {statCard(`+${sessionWords.toLocaleString()}`, "วันนี้", sessionGoalPct>=100?"#22c55e":accent, "⚡")}
      </div>

      {/* ── 2-col layout: ring + goal ── */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>

        {/* Completion Ring */}
        <div style={{padding:20,background:panel,borderRadius:16,border:`1px solid ${border}`,display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{fontSize:12,fontWeight:700,opacity:.5,marginBottom:14,textTransform:"uppercase",letterSpacing:".08em",alignSelf:"flex-start"}}>ความคืบหน้า</div>
          <svg width={140} height={140} viewBox="0 0 140 140">
            {/* bg ring */}
            <circle cx="70" cy="70" r="54" fill="none" stroke={`${border}88`} strokeWidth="12" />
            {/* progress ring */}
            <circle cx="70" cy="70" r="54" fill="none" stroke={completionPct>=100?"#22c55e":accent} strokeWidth="12"
              strokeDasharray={`${strokeDash} ${circumference}`}
              strokeDashoffset={circumference * 0.25}
              strokeLinecap="round"
              style={{transition:"stroke-dasharray .8s ease"}} />
            <text x="70" y="66" textAnchor="middle" fontSize="22" fontWeight="800" fill={completionPct>=100?"#22c55e":accent}>{completionPct}%</text>
            <text x="70" y="84" textAnchor="middle" fontSize="10" fill={ink} opacity=".45">{totalWords.toLocaleString()} คำ</text>
          </svg>
          <div style={{marginTop:10,display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:11,opacity:.5}}>เป้า</span>
            <input type="number" value={targetWords}
              onChange={e=>{ const n=parseInt(e.target.value); if(n>0) setProjectTarget(n); }}
              style={{width:80,padding:"3px 8px",background:`${border}44`,border:`1px solid ${border}`,borderRadius:6,fontSize:12,color:ink,textAlign:"center",outline:"none"}} />
            <span style={{fontSize:11,opacity:.5}}>คำ</span>
          </div>
          {completionPct < 100 && (
            <div style={{marginTop:6,fontSize:11,opacity:.5}}>เหลือ {Math.max(0,targetWords-totalWords).toLocaleString()} คำ</div>
          )}
        </div>

        {/* Daily Goal Card */}
        <div style={{padding:20,background:panel,borderRadius:16,border:`1px solid ${border}`}}>
          <div style={{fontSize:12,fontWeight:700,opacity:.5,marginBottom:14,textTransform:"uppercase",letterSpacing:".08em"}}>Daily Goal</div>
          {/* Session arc */}
          <div style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontSize:12,opacity:.65}}>วันนี้</span>
              <span style={{fontSize:13,fontWeight:800,color:sessionGoalPct>=100?"#22c55e":accent}}>{sessionWords.toLocaleString()} คำ</span>
            </div>
            <div style={{height:14,background:`${border}44`,borderRadius:20,overflow:"hidden",marginBottom:4}}>
              <div style={{
                height:"100%",width:`${sessionGoalPct}%`,
                background:sessionGoalPct>=100?"#22c55e":`linear-gradient(90deg,${accent},${accent}cc)`,
                borderRadius:20,transition:".5s",
                boxShadow:sessionGoalPct>=100?"0 0 10px #22c55e66":"none",
              }}/>
            </div>
            <div style={{fontSize:11,opacity:.45,textAlign:"right"}}>{sessionGoalPct}% of {writingGoal.toLocaleString()} คำ</div>
          </div>
          {/* Goal input */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <span style={{fontSize:11,opacity:.55,flexShrink:0}}>เป้า/วัน</span>
            <input type="number" value={writingGoal}
              onChange={e=>{ const n=parseInt(e.target.value); if(n>0) setWritingGoal(n); }}
              style={{flex:1,padding:"5px 8px",background:`${border}44`,border:`1px solid ${border}`,borderRadius:7,fontSize:13,color:ink,textAlign:"center",outline:"none"}} />
            <span style={{fontSize:11,opacity:.55}}>คำ</span>
          </div>
          {/* Streak summary */}
          <div style={{padding:"10px 12px",background:`${border}22`,borderRadius:10}}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:12,opacity:.55}}>🔥 Streak</span>
              <span style={{fontSize:14,fontWeight:800,color:"#f97316"}}>{streakData?.streak||0} วัน</span>
            </div>
            <div style={{fontSize:10,opacity:.4,marginTop:2}}>สูงสุด: {streakData?.longestStreak||0} วัน · รวม: {streakData?.totalDaysWritten||0} วัน</div>
          </div>
        </div>
      </div>

      {/* ── Writing Velocity Chart (bar chart svg) ── */}
      {chapterWords.length > 0 && (
        <div style={{padding:20,background:panel,borderRadius:16,border:`1px solid ${border}`,marginBottom:24}}>
          <div style={{fontSize:12,fontWeight:700,opacity:.5,marginBottom:16,textTransform:"uppercase",letterSpacing:".08em"}}>📊 คำแต่ละบท (Velocity)</div>
          <div style={{overflowX:"auto"}}>
            <div style={{display:"flex",alignItems:"flex-end",gap:6,minWidth:Math.max(400,chapterWords.length*36),height:120,paddingBottom:20,position:"relative"}}>
              {/* baseline */}
              <div style={{position:"absolute",bottom:20,left:0,right:0,height:1,background:`${border}55`}} />
              {chapterWords.map((c, i) => {
                const h = Math.max(4, Math.round((c.wc / maxWc) * 90));
                return (
                  <div key={c.id} style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1,cursor:"pointer",minWidth:28}}
                    onClick={()=>onOpenChapter(c.id)}
                    title={`${c.title}: ${c.wc.toLocaleString()} คำ`}>
                    <div style={{
                      width:"100%", height:h,
                      background:accent,
                      borderRadius:"4px 4px 0 0",
                      opacity:.75,
                      transition:".2s",
                    }}
                      onMouseEnter={e=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.boxShadow=`0 0 8px ${accent}88`; }}
                      onMouseLeave={e=>{ e.currentTarget.style.opacity=".75"; e.currentTarget.style.boxShadow="none"; }}
                    />
                    <div style={{fontSize:9,opacity:.4,marginTop:4,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:32,textAlign:"center"}}>{i+1}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{fontSize:11,opacity:.4,marginTop:4}}>คลิกแท่งเพื่อเปิดบท · สูงสุด {maxWc.toLocaleString()} คำ/บท</div>
        </div>
      )}

      {/* ── Recent / Top chapters ── */}
      {activeChapters.length > 0 && (
        <div style={{padding:20,background:panel,borderRadius:16,border:`1px solid ${border}`}}>
          <div style={{fontSize:12,fontWeight:700,opacity:.5,marginBottom:14,textTransform:"uppercase",letterSpacing:".08em"}}>🏆 บทที่มีเนื้อหามากสุด</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {activeChapters.map((c, i) => {
              const pct = Math.round(c.wc / totalWords * 100);
              return (
                <div key={c.id} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",padding:"8px 10px",borderRadius:10,transition:".12s"}}
                  onClick={()=>onOpenChapter(c.id)}
                  onMouseEnter={e=>e.currentTarget.style.background=`${accent}11`}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <div style={{width:24,height:24,borderRadius:"50%",background:i===0?accent:`${accent}33`,color:i===0?"#fff":accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0}}>{i+1}</div>
                  <div style={{flex:1,overflow:"hidden"}}>
                    <div style={{fontSize:12,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.title}</div>
                    <div style={{height:3,background:`${border}44`,borderRadius:10,overflow:"hidden",marginTop:4}}>
                      <div style={{height:"100%",width:`${pct*3}%`,background:accent,borderRadius:10,maxWidth:"100%"}} />
                    </div>
                  </div>
                  <div style={{fontSize:12,fontWeight:700,color:accent,flexShrink:0}}>{c.wc.toLocaleString()}</div>
                  <div style={{fontSize:10,opacity:.4,flexShrink:0}}>{pct}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {chapters.length === 0 && (
        <div style={{textAlign:"center",opacity:.3,padding:48}}>
          <div style={{fontSize:48,marginBottom:12}}>📖</div>
          <div style={{fontSize:14}}>ยังไม่มีบท — เริ่มเขียนก่อนเลย!</div>
        </div>
      )}
    </div>
  );
});

// ─── IMAGE INSERT DIALOG ──────────────────────────────────────────────────────
// BUG FIX + FEATURE: แทนที่ handleInsertImage แบบเดิมที่สร้าง placeholder เปล่า
// ด้วย dialog ที่ให้เลือก: อัปโหลดไฟล์ / ใส่ URL / หรือ placeholder เปล่า
const ImageInsertDialog = memo(function ImageInsertDialog({ theme, onInsertUrl, onInsertBlank, onClose, onFileUpload }) {
  const [urlVal, setUrlVal] = useState("");
  const [urlErr, setUrlErr] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);
  const { panel, border, ink, accent, bg } = theme;

  function handleUrlInsert() {
    const u = urlVal.trim();
    if (!u) { setUrlErr("กรุณาใส่ URL รูปภาพ"); return; }
    if (!/^https?:\/\/.+/i.test(u) && !u.startsWith("data:")) {
      setUrlErr("URL ไม่ถูกต้อง (ต้องขึ้นต้นด้วย http:// หรือ https://)");
      return;
    }
    onInsertUrl(u, "");
  }

  function readFile(file) {
    if (!file || !file.type.startsWith("image/")) { setUrlErr("ไฟล์ต้องเป็นรูปภาพ"); return; }
    const reader = new FileReader();
    reader.onload = ev => onFileUpload(ev.target.result, file.name);
    reader.readAsDataURL(file);
  }

  function handleFileChange(e) { readFile(e.target.files?.[0]); e.target.value = ""; }
  function handleDrop(e) {
    e.preventDefault(); setDragOver(false);
    readFile(e.dataTransfer.files?.[0]);
  }

  return (
    <div className="modal-bg" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="fade-in" style={{
        background:panel, border:`1px solid ${border}`,
        borderRadius:16, padding:0,
        width:"min(460px,95vw)",
        boxShadow:"0 24px 64px #0005", overflow:"hidden",
      }}>
        {/* Header */}
        <div style={{padding:"14px 18px 12px",borderBottom:`1px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontWeight:800,fontSize:15}}>🖼 แทรกรูปภาพ</div>
            <div style={{fontSize:11,opacity:.4,marginTop:2}}>เลือกวิธีเพิ่มรูปภาพเข้าสู่บท</div>
          </div>
          <button onClick={onClose} style={{width:28,height:28,border:`1px solid ${border}`,borderRadius:8,background:"transparent",color:ink,fontSize:16,cursor:"pointer",opacity:.6}}>×</button>
        </div>

        <div style={{padding:"18px 20px",display:"flex",flexDirection:"column",gap:16}}>

          {/* ── Upload from file / drag ── */}
          <div>
            <div style={{fontSize:11,fontWeight:700,opacity:.5,marginBottom:8,textTransform:"uppercase",letterSpacing:".06em"}}>📁 อัปโหลดจากไฟล์</div>
            <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFileChange}/>
            <div
              onClick={()=>fileRef.current?.click()}
              onDragOver={e=>{e.preventDefault();setDragOver(true);}}
              onDragLeave={()=>setDragOver(false)}
              onDrop={handleDrop}
              style={{
                width:"100%",padding:"28px 12px",
                border:`2px dashed ${dragOver?accent:border}`,
                borderRadius:10,
                background:dragOver?`${accent}11`:`${border}22`,
                cursor:"pointer",fontSize:13,color:ink,
                display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                transition:".15s",boxSizing:"border-box",
              }}>
              <span style={{fontSize:30,lineHeight:1}}>{dragOver?"⬇️":"🖼"}</span>
              <span style={{opacity:.7,fontWeight:600}}>{dragOver?"ปล่อยเพื่อแทรก":"คลิกเลือกหรือลากไฟล์มาวาง"}</span>
              <span style={{fontSize:10,opacity:.4}}>PNG · JPG · GIF · WebP · SVG</span>
            </div>
          </div>

          {/* ── Insert from URL ── */}
          <div>
            <div style={{fontSize:11,fontWeight:700,opacity:.5,marginBottom:8,textTransform:"uppercase",letterSpacing:".06em"}}>🌐 แทรกจาก URL</div>
            <div style={{display:"flex",gap:6}}>
              <input
                autoFocus
                value={urlVal}
                onChange={e=>{setUrlVal(e.target.value);setUrlErr("");}}
                onKeyDown={e=>{ if(e.key==="Enter") handleUrlInsert(); }}
                placeholder="https://example.com/image.jpg"
                style={{
                  flex:1, padding:"8px 12px",
                  border:`1.5px solid ${urlErr?"#ef4444":border}`,
                  borderRadius:8, fontSize:13, color:ink,
                  background:bg, outline:"none", transition:".15s",
                }}
                onFocus={e=>e.target.style.borderColor=accent}
                onBlur={e=>e.target.style.borderColor=urlErr?"#ef4444":border}
              />
              <button onClick={handleUrlInsert}
                style={{padding:"8px 16px",background:accent,color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                ➕ แทรก
              </button>
            </div>
            {urlErr && <div style={{fontSize:11,color:"#ef4444",marginTop:5,display:"flex",alignItems:"center",gap:4}}>⚠️ {urlErr}</div>}
            <div style={{fontSize:10,opacity:.35,marginTop:4,lineHeight:1.5}}>
              ใช้ URL ของรูปภาพที่สาธารณะ (public) · รูปจาก Google Photos / Dropbox ส่วนตัวอาจไม่โหลด
            </div>
          </div>

          {/* ── Footer buttons ── */}
          <div style={{borderTop:`1px solid ${border}`,paddingTop:12,display:"flex",gap:8}}>
            <button onClick={onInsertBlank}
              style={{flex:1,padding:"8px 10px",border:`1px solid ${border}`,borderRadius:8,background:"transparent",color:ink,fontSize:12,cursor:"pointer",opacity:.7,transition:".12s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=accent;e.currentTarget.style.opacity="1";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=border;e.currentTarget.style.opacity=".7";}}>
              📄 Placeholder เปล่า
            </button>
            <button onClick={onClose}
              style={{padding:"8px 18px",border:`1px solid ${border}`,borderRadius:8,background:"transparent",color:ink,fontSize:12,cursor:"pointer",opacity:.6}}>
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// ─── SAVE AS DIALOG ──────────────────────────────────────────────────────────
const SaveAsDialog = memo(function SaveAsDialog({ defaultName, theme, onSave, onClose }) {
  const [filename, setFilename] = useState(defaultName || "");
  const [format,   setFormat]   = useState("novelforge");

  const formats = [
    { id:"novelforge", icon:"💾", label:".novelforge",  desc:"โปรเจกต์เต็ม — import กลับได้" },
    { id:"md",         icon:"📝", label:"Markdown (.md)", desc:"ทุกบทรวมไฟล์เดียว พร้อม heading" },
    { id:"txt",        icon:"📄", label:"Plain Text (.txt)", desc:"ข้อความล้วน ไม่มี formatting" },
    { id:"html",       icon:"🌐", label:"HTML (.html)",  desc:"หนังสือพร้อม CSS — เปิดใน browser" },
    { id:"pdf",        icon:"📕", label:"PDF",           desc:"ส่งออก PDF (ใช้ browser print)" },
    { id:"epub",       icon:"📖", label:"EPUB",          desc:"e-book สำหรับ Kindle / reader" },
  ];

  const { panel, border, ink, accent } = theme;

  return (
    <div className="modal-bg" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="fade-in" style={{
        background:panel, border:`1px solid ${border}`,
        borderRadius:16, padding:0, width:"min(480px,95vw)",
        maxHeight:"90vh", display:"flex", flexDirection:"column",
        overflow:"hidden", boxShadow:"0 24px 64px #0005",
      }}>
        {/* Header */}
        <div style={{padding:"16px 20px 12px",borderBottom:`1px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontWeight:800,fontSize:16}}>💾 Save As</div>
            <div style={{fontSize:11,opacity:.45,marginTop:2}}>เลือกชื่อไฟล์และรูปแบบที่ต้องการ</div>
          </div>
          <button onClick={onClose} style={{width:28,height:28,border:`1px solid ${border}`,borderRadius:8,background:"transparent",color:ink,fontSize:14,cursor:"pointer",opacity:.6}}>×</button>
        </div>

        {/* Body */}
        <div style={{flex:1,overflowY:"auto",padding:"18px 20px",display:"flex",flexDirection:"column",gap:16}}>

          {/* Filename */}
          <div>
            <label style={{fontSize:11,fontWeight:700,opacity:.55,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>ชื่อไฟล์</label>
            <input
              autoFocus
              value={filename}
              onChange={e=>setFilename(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter") onSave({ filename, format }); }}
              placeholder="ชื่อหนังสือ..."
              style={{width:"100%",padding:"8px 12px",border:`1.5px solid ${border}`,borderRadius:9,fontSize:14,color:ink,background:theme.bg,outline:"none",boxSizing:"border-box",transition:".15s"}}
              onFocus={e=>e.target.style.borderColor=accent}
              onBlur={e=>e.target.style.borderColor=border}
            />
            <div style={{fontSize:10,opacity:.35,marginTop:4}}>
              นามสกุลจะถูกเพิ่มอัตโนมัติตามรูปแบบที่เลือก
            </div>
          </div>

          {/* Format picker */}
          <div>
            <label style={{fontSize:11,fontWeight:700,opacity:.55,display:"block",marginBottom:8,textTransform:"uppercase",letterSpacing:".06em"}}>รูปแบบไฟล์</label>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {formats.map(f=>(
                <button key={f.id} onClick={()=>setFormat(f.id)}
                  style={{
                    display:"flex",alignItems:"center",gap:12,padding:"10px 14px",
                    border:`1.5px solid ${format===f.id?accent:border}`,
                    borderRadius:10, background: format===f.id?`${accent}12`:"transparent",
                    cursor:"pointer", transition:".12s", textAlign:"left",
                  }}>
                  <span style={{fontSize:20,lineHeight:1,flexShrink:0}}>{f.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:format===f.id?700:500,color:format===f.id?accent:ink}}>{f.label}</div>
                    <div style={{fontSize:11,opacity:.5,marginTop:1}}>{f.desc}</div>
                  </div>
                  {format===f.id && <span style={{fontSize:16,color:accent,flexShrink:0}}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{padding:"12px 20px",borderTop:`1px solid ${border}`,display:"flex",gap:8}}>
          <button
            onClick={()=>onSave({ filename, format })}
            style={{flex:1,padding:"10px",background:accent,color:"#fff",border:"none",borderRadius:9,fontSize:14,fontWeight:700,cursor:"pointer"}}>
            💾 บันทึก
          </button>
          <button onClick={onClose} className="btn" style={{padding:"10px 18px",fontSize:13}}>ยกเลิก</button>
        </div>
      </div>
    </div>
  );
});

// ─── MENU DROPDOWN ────────────────────────────────────────────────────────────
const MenuDropdown = memo(function MenuDropdown({ label, items, theme }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handle(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={ref} style={{position:"relative"}}>
      <button className="menu-item" onClick={()=>setOpen(o=>!o)}>{label}</button>
      {open && (
        <div style={{position:"absolute",top:"100%",left:0,background:theme.panel,border:`1px solid ${theme.border}`,borderRadius:10,minWidth:200,boxShadow:"0 8px 32px #0003",zIndex:1000,padding:"4px 0"}}>
          {items.map((item,i) => (
            item.fn === null
              ? <div key={i} style={{height:1,background:theme.border,margin:"4px 10px",opacity:.4}} />
              : <button key={i} onClick={()=>{item.fn();setOpen(false);}}
                  style={{display:"block",width:"100%",padding:"8px 16px",textAlign:"left",background:"none",border:"none",cursor:"pointer",fontSize:13,color:theme.ink,transition:".1s"}}
                  onMouseEnter={e=>e.target.style.background=`${theme.border}55`}
                  onMouseLeave={e=>e.target.style.background="none"}>
                  {item.label}
                </button>
          ))}
        </div>
      )}
    </div>
  );
}
);