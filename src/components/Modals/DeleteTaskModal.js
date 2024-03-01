import React from 'react';
import styles from './DeleteTaskModal.module.css';

const DeleteTaskModal = ({ setIsDelete, newData, deleteTask }) => {
    // console.log("newData", newData);
    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <h1 className={styles.modalTitle}>
                    Are you sure you want to Delete?
                </h1>
                <div className={styles.buttonContainer}>
                    <button
                        onClick={async () => {
                            await deleteTask(newData?._id);
                            setIsDelete(false);
                        }}
                        className={styles.yesButton}
                    >
                        Yes, Delete
                    </button>
                    <button
                        onClick={() => { setIsDelete(false) }}
                        className={styles.cancelButton}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteTaskModal;
