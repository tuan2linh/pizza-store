import { X } from "react-feather";

const ModalConfirm = ({ open, onClose, title, message, onConfirm, image }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <X />
        </button>
        <h2 className="text-3xl font-semibold mb-4">{title}</h2>

        {/* Render image if provided */}
        {image && (
          <div className="flex items-center justify-center mx-4">
            <img
              src={image}
              alt="Modal visual"
              className="mb-4 rounded h-[300px]"
            />
          </div>
        )}

        <div className="mb-4">{message}</div>

        {/* Render Cancel and Confirm buttons only if onClose and onConfirm are provided */}
        {onClose && onConfirm && (
          <div className="flex justify-center items-center">
            {onClose && (
              <button
                onClick={onClose}
                className="mr-10 py-3 px-10 rounded-md bg-gray-300 hover:bg-gray-400 shadow-lg"
              >
                Cancel
              </button>
            )}
            {onConfirm && (
              <button
                onClick={onConfirm}
                className="py-3 px-10 rounded-md bg-red-500 text-white hover:bg-red-600 shadow-lg"
              >
                Confirm
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalConfirm;
