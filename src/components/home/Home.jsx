
import { Grid } from '@material-ui/core';
import React from 'react';
//components
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';
import Header from '../header/Header';
import '../../App.css';
const Home = () => {

    return (
        <div >
            <Header />
            <Banner />
            <Grid container>
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Posts />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;