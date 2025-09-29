import styles from './ModalWindow.module.css'

type PropsModalWindow = {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode
}

export default function Modal(modalWindowActive: PropsModalWindow){
    return(
        <div className= {`${styles.modal} ${modalWindowActive.active ? styles.active : ''}`} onClick={() => modalWindowActive.setActive(false)}>
            <div className={`${styles.modal__content} ${modalWindowActive.active ? styles.active : ''}`} onClick={e => e.stopPropagation()}>
                {modalWindowActive.children}
            </div>

        </div>
    );
};