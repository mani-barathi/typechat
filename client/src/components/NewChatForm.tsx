import React, { useRef } from "react";

interface NewChatFormProps {
  closeFn: () => void;
}

const NewChatForm: React.FC<NewChatFormProps> = ({ closeFn }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(inputRef.current?.value);
    inputRef.current!.value = "";
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        className="form-input mb-2"
        placeholder="Enter a Username"
        required
      />
      <div className="flex justify-end">
        <button
          type="button"
          className="form-btn-secondary mr-2"
          onClick={closeFn}
        >
          Cancel
        </button>
        <button className="form-btn">Create</button>
      </div>
    </form>
  );
};

export default NewChatForm;
