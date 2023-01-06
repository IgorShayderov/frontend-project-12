import AddModal from './add-modal.jsx';
import RemoveModal from './remove-modal.jsx';
import RenameModal from './rename-modal.jsx';

const modals = {
  adding: AddModal,
  removing: RemoveModal,
  renaming: RenameModal,
};

export default (modalName) => modals[modalName];
