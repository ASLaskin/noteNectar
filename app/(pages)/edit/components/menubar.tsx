import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeSSlashLine,
  RiListOrdered2,
} from "react-icons/ri";
import { AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";
import { BsTypeUnderline } from "react-icons/bs";
import { IoListOutline } from "react-icons/io5";
import { Editor } from "@tiptap/react";

const Button = ({
  onClick,
  isActive,
  disabled,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded-md transition ${isActive
        ? "bg-indigo-600 text-white"
        : "bg-white text-gray-700 hover:bg-gray-200"
      } ${disabled ? "cursor-not-allowed opacity-50" : "hover:shadow-md"}`}
  >
    {children}
  </button>
);

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const buttons = [
    {
      icon: <RiBold className="size-5" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <BsTypeUnderline className="size-5" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
    },
    {
      icon: <RiItalic className="size-5" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      icon: <RiStrikethrough className="size-5" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      icon: <RiCodeSSlashLine className="size-5" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
      disabled: !editor.can().chain().focus().toggleCode().run(),
    },
    {
      icon: <IoListOutline className="size-5" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <RiListOrdered2 className="size-5" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
    },
    {
      icon: <AiOutlineUndo className="size-5" />,
      onClick: () => editor.chain().focus().undo().run(),
      isActive: editor.isActive("undo"),
      disabled: !editor.can().chain().focus().undo().run(),
    },
    {
      icon: <AiOutlineRedo className="size-5" />,
      onClick: () => editor.chain().focus().redo().run(),
      isActive: editor.isActive("redo"),
      disabled: !editor.can().chain().focus().redo().run(),
    },
  ];

  const headingButtons = [
    { level: 1 as const, label: "H1" },
    { level: 2 as const, label: "H2" },
    { level: 3 as const, label: "H3" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-4 rounded-lg shadow-sm">
        {buttons.map(({ icon, onClick, isActive, disabled }, index) => (
          <button
            key={index}
            onClick={onClick}
            disabled={disabled}
            className={`p-3 rounded-md transition ${isActive
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
              } ${disabled ? "cursor-not-allowed opacity-50" : "hover:shadow-md"}`}
          >
            {icon}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 p-4 rounded-lg shadow-sm">
        {headingButtons.map(({ level, label }) => (
          <button
            key={level}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            className={`p-3 rounded-md transition ${editor.isActive("heading", { level })
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
