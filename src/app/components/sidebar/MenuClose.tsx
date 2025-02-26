import { Close } from "@mui/icons-material"

interface MenuCloseProps {
    onClick: any
}

export default function MenuClose(props: MenuCloseProps) {
    const {onClick} = props;
    return (
        <button onClick={onClick}><Close className='text-white hover:text-primary-50'/></button>
    )
}