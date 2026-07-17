import { useEffect, useMemo, useRef, useState } from "react";
import { FaBook, FaFilePdf, FaImage, FaPlus, FaTrash } from "react-icons/fa";

export default function Note() {
  const [subjectInput, setSubjectInput] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [activeSubjectId, setActiveSubjectId] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteFile, setNoteFile] = useState(null);
  const [noteError, setNoteError] = useState("");
  const fileInputRef = useRef(null);
  const createdUrlsRef = useRef(new Set());

  const activeSubject = useMemo(
    () => subjects.find((subject) => subject.id === activeSubjectId) ?? null,
    [subjects, activeSubjectId],
  );

  const handleAddSubject = (event) => {
    event.preventDefault();

    const trimmedName = subjectInput.trim();
    if (!trimmedName) return;

    const isDuplicate = subjects.some(
      (subject) => subject.name.toLowerCase() === trimmedName.toLowerCase(),
    );
    if (isDuplicate) {
      setSubjectInput("");
      return;
    }

    const newSubject = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: trimmedName,
      notes: [],
    };

    setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
    setActiveSubjectId(newSubject.id);
    setSubjectInput("");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] ?? null;
    if (!selectedFile) {
      setNoteFile(null);
      return;
    }

    const isImage = selectedFile.type.startsWith("image/");
    const isPdf = selectedFile.type === "application/pdf";

    if (!isImage && !isPdf) {
      setNoteError("Only image or PDF files are allowed.");
      setNoteFile(null);
      event.target.value = "";
      return;
    }

    setNoteError("");
    setNoteFile(selectedFile);
  };

  const resetNoteForm = () => {
    setNoteTitle("");
    setNoteContent("");
    setNoteFile(null);
    setNoteError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddNote = (event) => {
    event.preventDefault();
    if (!activeSubjectId) return;

    const trimmedTitle = noteTitle.trim();
    const trimmedContent = noteContent.trim();

    if (!trimmedTitle) {
      setNoteError("Title is required.");
      return;
    }

    if (!trimmedContent && !noteFile) {
      setNoteError("Add text, a PDF/image file, or both.");
      return;
    }

    let attachment = null;
    if (noteFile) {
      const isImage = noteFile.type.startsWith("image/");
      const isPdf = noteFile.type === "application/pdf";
      if (!isImage && !isPdf) {
        setNoteError("Only image or PDF files are allowed.");
        return;
      }

      const objectUrl = URL.createObjectURL(noteFile);
      createdUrlsRef.current.add(objectUrl);
      attachment = {
        name: noteFile.name,
        url: objectUrl,
        type: isPdf ? "pdf" : "image",
      };
    }

    const newNote = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: trimmedTitle,
      content: trimmedContent,
      attachment,
    };

    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.id === activeSubjectId
          ? { ...subject, notes: [newNote, ...subject.notes] }
          : subject,
      ),
    );

    resetNoteForm();
  };

  const handleDeleteNote = (noteId) => {
    if (!activeSubjectId) return;

    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) => {
        if (subject.id !== activeSubjectId) return subject;

        const noteToDelete = subject.notes.find((note) => note.id === noteId);
        if (noteToDelete?.attachment?.url) {
          URL.revokeObjectURL(noteToDelete.attachment.url);
          createdUrlsRef.current.delete(noteToDelete.attachment.url);
        }

        return {
          ...subject,
          notes: subject.notes.filter((note) => note.id !== noteId),
        };
      }),
    );
  };

  const clearAllUrls = () => {
    createdUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    createdUrlsRef.current.clear();
  };

  useEffect(() => {
    return () => {
      clearAllUrls();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b1219] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(45,212,191,0.18),transparent_34%),radial-gradient(circle_at_90%_10%,rgba(251,191,36,0.18),transparent_30%),linear-gradient(180deg,rgba(11,18,25,1),rgba(7,11,17,1))]" />
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-teal-300/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-56 h-80 w-80 rounded-full bg-amber-300/15 blur-3xl" />

      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-6 rounded-[2rem] border border-white/10 bg-white/6 p-5 backdrop-blur-2xl sm:p-7">
          <p className="text-sm uppercase tracking-[0.22em] text-teal-200/70">
            Notes Space
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Organize notes subject-wise and keep everything in one place.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            Add subjects, then create notes with title and text, plus optional
            image or PDF. Each subject keeps its own note list.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr]">
          <aside className="rounded-3xl border border-white/10 bg-white/6 p-5 backdrop-blur-xl sm:p-6">
            <h2 className="text-xl font-semibold text-white">Subjects</h2>

            <form onSubmit={handleAddSubject} className="mt-4 space-y-3">
              <input
                value={subjectInput}
                onChange={(event) => setSubjectInput(event.target.value)}
                type="text"
                placeholder="Add a subject (e.g. Physics)"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300 focus:bg-slate-900/80"
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-200"
              >
                <FaPlus className="text-sm" />
                Add Subject
              </button>
            </form>

            <div className="mt-5 space-y-2">
              {subjects.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-4 text-sm text-slate-300">
                  No subjects yet. Add your first subject to start creating
                  notes.
                </p>
              ) : (
                subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setActiveSubjectId(subject.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                      subject.id === activeSubjectId
                        ? "border-teal-200/35 bg-teal-300/20 text-white"
                        : "border-white/10 bg-white/6 text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <FaBook className="text-xs" />
                      {subject.name}
                    </span>
                    <span className="text-xs text-slate-300">
                      {subject.notes.length}
                    </span>
                  </button>
                ))
              )}
            </div>
          </aside>

          <article className="rounded-3xl border border-white/10 bg-white/6 p-5 backdrop-blur-xl sm:p-6">
            {!activeSubject ? (
              <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
                <p className="text-lg font-semibold text-white">
                  Select a Subject
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Pick a subject from the left or create one, then add notes.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-teal-200/75">
                      Active Subject
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold text-white">
                      {activeSubject.name}
                    </h2>
                  </div>
                </div>

                <form
                  onSubmit={handleAddNote}
                  className="mt-4 space-y-3 rounded-2xl border border-white/12 bg-slate-950/35 p-4"
                >
                  <input
                    value={noteTitle}
                    onChange={(event) => setNoteTitle(event.target.value)}
                    type="text"
                    placeholder="Note title"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300"
                  />
                  <textarea
                    value={noteContent}
                    onChange={(event) => setNoteContent(event.target.value)}
                    rows={4}
                    placeholder="Write note content (optional if PDF/image is added)"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300"
                  />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-white/15">
                      <FaImage className="text-sm" />
                      Attach Image/PDF
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
                    >
                      <FaPlus className="text-xs" />
                      Add Note
                    </button>
                  </div>

                  {noteFile && (
                    <p className="text-xs text-slate-300">
                      Attached file: {noteFile.name}
                    </p>
                  )}
                  {noteError && (
                    <p className="text-xs text-red-300">{noteError}</p>
                  )}
                </form>

                <div className="mt-5">
                  {activeSubject.notes.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
                      <p className="text-lg font-semibold text-white">
                        No notes added yet
                      </p>
                      <p className="mt-2 text-sm text-slate-300">
                        Add text note, image/PDF note, or both for{" "}
                        {activeSubject.name}.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {activeSubject.notes.map((note) => (
                        <figure
                          key={note.id}
                          className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                        >
                          <figcaption>
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p
                                  className="truncate text-base font-semibold text-white"
                                  title={note.title}
                                >
                                  {note.title}
                                </p>
                                {note.content && (
                                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                                    {note.content}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() => handleDeleteNote(note.id)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-300/30 bg-red-500/15 text-red-200 transition hover:bg-red-500/25"
                                aria-label={`Delete ${note.title}`}
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>

                            {note.attachment?.type === "image" && (
                              <img
                                src={note.attachment.url}
                                alt={note.attachment.name}
                                className="mt-3 h-44 w-full rounded-xl border border-white/10 object-cover"
                              />
                            )}

                            {note.attachment?.type === "pdf" && (
                              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/6 px-3 py-2.5">
                                <div className="inline-flex min-w-0 items-center gap-2 text-sm text-slate-200">
                                  <FaFilePdf className="shrink-0 text-red-300" />
                                  <span
                                    className="truncate"
                                    title={note.attachment.name}
                                  >
                                    {note.attachment.name}
                                  </span>
                                </div>
                                <a
                                  href={note.attachment.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-semibold text-teal-200 transition hover:text-teal-100"
                                >
                                  Open
                                </a>
                              </div>
                            )}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </article>
        </section>
      </main>
    </div>
  );
}
