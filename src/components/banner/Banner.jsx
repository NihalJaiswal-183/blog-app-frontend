
import { makeStyles, Box, Typography } from '@material-ui/core';

const useStyle = makeStyles({
    image: {
        width: '100%',
        background: `url(${'https://tse4.mm.bing.net/th?id=OIP.OcdKodm_a3FiAYKlUAjFdgHaE8&pid=Api&P=0&w=246&h=165'}) center/55% repeat-x #000`,
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& :first-child': {
            fontSize: 70,
            color: 'black',
            lineHeight: 1
        },
        '& :last-child': {
            fontSize: 20,
            background: '#FFFFFF',
        }
    }
})

const Banner = () => {
    const classes = useStyle();
    const url = 'https://cdn.pixabay.com/photo/2017/10/10/21/47/laptop-2838921_960_720.jpg';
    // const url='https://tse4.mm.bing.net/th?id=OIP.OcdKodm_a3FiAYKlUAjFdgHaE8&pid=Api&P=0&w=246&h=165';
    return (
        <>
            <Box className={classes.image}>
                <Typography>BLOG</Typography>
                <Typography>SOFTWARE ENGINEERING</Typography>
            </Box>
        </>
    )
}

export default Banner;