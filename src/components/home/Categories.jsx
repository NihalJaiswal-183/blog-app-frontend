import { useContext } from "react";
import { Button, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Grid } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import  {LoginContext} from '../../App';
import { categories } from '../../constants/data';

const useStyle = makeStyles({
    table: {
        border: '1px solid rgba(224, 224, 224, 1)'
    },
    write: {
        margin: 20,
        width: '85%',
        background: '#6495ED',
        color: '#fff',
        textDecoration: 'none'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
})

const Categories = ({ match }) => {
    const classes = useStyle();
    const location = useLocation();
    const{account}=useContext(LoginContext);
    let params = new URLSearchParams(location.search);
    return (
        <>
        {
        account?
            <Link to={`/create/${location.search}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" className={classes.write}>Create Blog</Button>
            </Link>
            :
            <h1>please sign in</h1>
        }
            <Table className={classes.table}>
                <TableHead>
                    <TableCell>
                        <Link to={"/"} className={classes.link}>
                            All Categories
                        </Link>
                    </TableCell>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow>
                                <TableCell>
                                    <Link to={`/?category=${category}`} className={classes.link}>
                                        {category}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default Categories;