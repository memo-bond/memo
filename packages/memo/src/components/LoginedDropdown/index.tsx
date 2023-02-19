import useStyles from './styles';
import { useEffect, useState } from "react";
import {AuthenticatedUser} from "../../dtos";

const LoginedDropdown = () => {
    const style = useStyles();
    const [user, setUser] = useState<AuthenticatedUser>();
    return (
        <>
        <img src={'https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/326400997_1639439686475613_655039213323653602_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=25VbFQtWvpIAX_6XfS5&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfBOJssfkrqlTNzvNVaNjgtUoSN1QNxTws0JJx-kCBc2PA&oe=63F75280'} alt="logo" className={style.logo} />
        </>
    );
}

export default  LoginedDropdown;