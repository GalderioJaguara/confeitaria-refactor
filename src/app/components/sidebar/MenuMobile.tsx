import { Menu } from '@mui/icons-material';

interface MenuMobileProps {
    onClick: any 
}

export default function MenuMobile(props: MenuMobileProps) {
    const {onClick} = props;    
    return (
        <button onClick={onClick}><Menu className="text-white hover:text-primary-50"/></button>
    );
}