import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Box from '@material-ui/core/Box';


import BarChart from './BarChart'
import ScatterPot from './ScatterPot'

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Switch from '@material-ui/core/Switch';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  useLocation
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
    drawer: {
        width: 240,
        flexShrink: 0,
      },
    drawerPaper: {
        width: 240,
      },
    drawerContainer: {
        overflow: 'auto',
      },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      },
    formControl: {
      minWidth: 150,
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      height: 500,
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    }));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const cleanDataNutrition1  = (nutrition) => {
    const {carbohydrate_Milled, 
    carbohydrate_Unpolished, 
    starch_Milled, 
    starch_Unpolished, 
    protein_Milled, 
    protein_Unpolished, 
    totalFat_Milled, 
    totalFat_Unpolished, 
    saturatedFat_Milled, 
    saturatedFat_Unpolished,
    fiber_dietaryFiber_Milled,
    fiber_dietaryFiber_Unpolished,
    crudeFiber_Milled,
    crudeFiber_Unpolished} = nutrition;
    const dataNutrition1 = [{name: "Carbohydrate", 'Milled rice': +carbohydrate_Milled, 'Unpolished rice': +carbohydrate_Unpolished },
                            {name: "Starch", 'Milled rice': +starch_Milled, 'Unpolished rice': +starch_Unpolished },
                            {name: "Protein", 'Milled rice': +protein_Milled, 'Unpolished rice': +protein_Unpolished },
                            {name: "Total fat", 'Milled rice': +totalFat_Milled, 'Unpolished rice': +totalFat_Unpolished },
                            {name: "Saturated fat", 'Milled rice': +saturatedFat_Milled, 'Unpolished rice': +saturatedFat_Unpolished },
                            {name: "Fiber or Dietary Fiber", 'Milled rice': +fiber_dietaryFiber_Milled, 'Unpolished rice': +fiber_dietaryFiber_Unpolished },
                            {name: "Crude Fiber", 'Milled rice': +crudeFiber_Milled, 'Unpolished rice': +crudeFiber_Unpolished },]
    return dataNutrition1;
};

const cleanDataPhysical1  = (physical) => {
    const {length,
    width,
    thickness,
    grainLength,
    grainWidth,
    grainThickness} = physical;
    const dataPhysical1 =  [{name: "Length",'Paddy rice': +length,'Unpolished rice': +grainLength},
                            {name: "Width",'Paddy rice': +width,'Unpolished rice': +grainWidth},
                            {name: "Thickness",'Paddy rice': +thickness,'Unpolished rice': +grainThickness}]
    return dataPhysical1;
};

const cleanChemical1  = (chemical) => {
    const {RAG_Milled, 
        RAG_Unpolished, 
        SAG_Milled, 
        SAG_Unpolished, 
        TG_Milled, 
        TG_Unpolished, 
        Ash_Milled, 
        Ash_Unpolished} = chemical;
    const dataChemical1 = [{name: "RAG", 'Milled rice': +RAG_Milled, 'Unpolished rice': +RAG_Unpolished },
                            {name: "SAG", 'Milled rice': +SAG_Milled, 'Unpolished rice': +SAG_Unpolished },
                            {name: "TG", 'Milled rice': +TG_Milled, 'Unpolished rice': +TG_Unpolished },
                            {name: "Ash fat", 'Milled rice': +Ash_Milled, 'Unpolished rice': +Ash_Unpolished }]
    return dataChemical1;
};
const cleanBioactive1  = (bioactive) => {
    const {tocopherolAlpha_Milled,
        tocopherolAlpha_Unpolished,
        tocopherolAlpha,
        tocopherolBeta_Milled,
        tocopherolBeta_Unpolished,
        tocopherolBeta,
        tocopherolGamma_Milled,
        gammaTocopherol_Milled,
        tocopherolGamma_Unpolished,
        tocopherolGamma,
        tocopherolSigma_Milled,
        tocopherolSigma_Unpolished,
        tocopherolDelta_Milled,
        tocopherolDelta_Unpolished,
        tocotrienolAlpha_Milled,
        tocotrienolAlpha_Unpolished,
        tocotrienolBeta_Milled,
        tocotrienolBeta_Unpolished,
        tocotrienolGamma_Milled_U1,
        tocotrienolGamma_Milled,
        tocotrienolGamma_Unpolished,
        tocotrienolSigma_Milled,
        tocotrienolSigma_Unpolished,
        tocotrienolDelta_Milled,
        tocotrienolDelta_Unpolished,
        prolamine,
        albumin,
        globulin,
        glutenin,
        omega3,
        omega6,
        omega9,
        tryptophan_Milled,
        tryptophan_Unpolished,
        threonine_Milled,
        threonine_Unpolished,
        isoleucine_Milled,
        isoleucine_Unpolished,
        leucine_Milled,
        leucine_Unpolished,
        lysine_Milled,
        lysine_Unpolished,
        methionine_Milled,
        methionine_Unpolished,
        cystine_Milled,
        cystine_Unpolished,
        phenylalanine_Milled,
        phenylalanine_Unpolished,
        tyrosine_Milled,
        tyrosine_Unpolished,
        valine_Milled,
        valine_Unpolished,
        arginnine_Milled,
        arginnine_Unpolished,
        histidine_Milled,
        histidine_Unpolished,
        alanine_Milled,
        alanine_Unpolished,
        asparticAcid_Milled,
        asparticAcid_Unpolished,
        glutamicAcid_Milled,
        glutamicAcid_Unpolished,
        glycine_Milled,
        glycine_Unpolished,
        proline_Milled,
        proline_Unpolished,
        serine_Milled,
        serine_Unpolished,
        cerine_Milled,
        cerine_Unpolished,
        ethylAlcohol,
        caffeine,
        theobromine,
        betaCarotene,
        alphaCarotene,
        betaCryptoxanthin,
        lycopene,
        luteinZeaxanthin,
        biotin_Unpolished,
        gammaOryzanol_Milled,
        gammaOryzanol_Unpolished,
        phenolicCompounds,
        totalAntioxidant_Milled_U1,
        totalAntioxidant_Unpolished,
        totalAntioxidant_Milled_U2,
        totalAntioxidant,
        antioxidantCompounds,
        gallicAcid_Milled,
        gallicAcid,
        eriodictyol_Milled,
        eriodictyol,
        anthocyanin,
        apigenin_Milled,
        apigenin,
        isoquercetin_Milled,
        isoquercetin,
        hydroquinin_Milled,
        hydroquinin,
        quercetin_Milled,
        quercetin,
        kaempferol_Milled,
        kaempferol,
        rutin_Milled,
        rutin,
        catechin_Milled,
        catechin,
        tannicAcid_Milled,
        tannicAcid,
        flavonoid,
        GABAgammaAminobutyricAcid} = bioactive;
    const dataBioactive1 = [{name: "Tocopherol Alpha", 'Milled rice': +tocopherolAlpha_Milled, 'Unpolished rice': +tocopherolAlpha_Unpolished },
                            {name: "Tocopherol Beta", 'Milled rice': +tocopherolBeta_Milled, 'Unpolished rice': +tocopherolBeta_Unpolished },
                            {name: "Tocopherol Gamma", 'Milled rice': +tocopherolGamma_Milled, 'Unpolished rice': +tocopherolGamma_Unpolished },
                            {name: "Tocopherol Sigma", 'Milled rice': +tocopherolSigma_Milled, 'Unpolished rice': +tocopherolSigma_Unpolished },
                            {name: "Tocopherol Delta", 'Milled rice': +tocopherolDelta_Milled, 'Unpolished rice': +tocopherolDelta_Unpolished },
                            {name: "Tocotrienol Alpha", 'Milled rice': +tocotrienolAlpha_Milled, 'Unpolished rice': +tocotrienolAlpha_Unpolished },
                            {name: "Tocotrienol Beta", 'Milled rice': +tocotrienolBeta_Milled, 'Unpolished rice': +tocotrienolBeta_Unpolished },
                            {name: "Tocotrienol Gamma", 'Milled rice': +tocotrienolGamma_Milled_U1, 'Unpolished rice': +tocotrienolGamma_Unpolished },
                            {name: "Tocotrienol Sigma", 'Milled rice': +tocotrienolSigma_Milled, 'Unpolished rice': +tocotrienolSigma_Unpolished },
                            {name: "Tocotrienol Delta", 'Milled rice': +tocotrienolDelta_Milled, 'Unpolished rice': +tocotrienolDelta_Unpolished },
                            {name: "Gallic acid", 'Milled rice': +gallicAcid_Milled, 'NA': +gallicAcid },
                            {name: "Eriodictyol", 'Milled rice': +eriodictyol_Milled, 'NA': +eriodictyol },
                            {name: "Anthocyanin", 'NA': +anthocyanin },
                            {name: "Apigenin", 'Milled rice': +apigenin_Milled, 'NA': +apigenin },
                            {name: "Isoquercetin", 'Milled rice': +isoquercetin_Milled, 'NA': +isoquercetin },
                            {name: "Hydroquinin", 'Milled rice': +hydroquinin_Milled, 'NA': +hydroquinin },
                            {name: "Quercetin", 'Milled rice': +quercetin_Milled, 'NA': +quercetin },
                            {name: "Kaempferol", 'Milled rice': +kaempferol_Milled, 'NA': +kaempferol },
                            {name: "Rutin", 'Milled rice': +rutin_Milled, 'NA': +rutin },
                            {name: "Catechin", 'Milled rice': +catechin_Milled, 'NA': +catechin },
                            {name: "Tannic acid", 'Milled rice': +tannicAcid_Milled, 'NA': +tannicAcid }]

    return dataBioactive1;
};
export default function Detail() {
    let query = useQuery();
    const ID = query.get("id");
    const classes = useStyles();
    const [checked, setChecked] = useState(true);
    const [checkButton, setCheckButton] = useState("nutrition");
    const [data, setData] = useState({})
    const [key, setKey] = useState(["Milled rice", "Unpolished rice"])
    const [colors, setColors] = useState(["#E3BA22", "#F2DA57"])
    useEffect(() => {
        setChecked(true);
        const getData = async () => {
            const result = await axios(`${checkButton}/${ID}`);
            const riceData = await result.data;
            switch(checkButton){
                case 'nutrition':
                    setData(cleanDataNutrition1(riceData));
                    setKey(["Milled rice", "Unpolished rice"]);
                    setColors(["#E3BA22", "#F2DA57"]);
                break;
                case 'bioactive':
                    setData(cleanBioactive1(riceData));
                    setKey(["Milled rice", "Unpolished rice", "NA"]);
                    setColors(["#137B80", "#42A5B3", "#005D6E"]);
                break;
                case 'chemical':
                    setData(cleanChemical1(riceData));
                    setKey(["Milled rice", "Unpolished rice"]);
                    setColors(["#E6842A", "#F6B656"]);
                break;
                case 'physical':
                    setData(cleanDataPhysical1(riceData));
                    setKey(["Paddy rice", "Unpolished rice"]);
                    setColors(["#8E6C8A", "#B396AD"]);
                break;
            }
            setChecked(false);
        };

        getData();
    }, [ID,checkButton]);


    useEffect(() => {
        // console.log(data);
    }, [data])
    const handleChange = (e) => {
        e.preventDefault();
        setCheckButton(e.currentTarget.value);
        console.log(e.currentTarget.value);
    };
    if(checked)
        return (
            <>
            <div className={classes.appBarSpacer} />
            <d>LOADING</d>
            </>
        );
    return (
        <div className={classes.root}>
        {/* <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}>
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem>
            <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />}label="Show"/>
            </ListItem>
          </List>
          <Divider />
        </div>
        </Drawer> */}
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Box m={1}>   
            <ButtonGroup >
                <Button value="nutrition" onClick={handleChange} variant={checkButton=="nutrition" ? "contained" : "outlined"}>Nutrition</Button>
                <Button value="bioactive" onClick={handleChange} variant={checkButton=="bioactive" ? "contained" : "outlined"}>Bioactive</Button>
                <Button value="chemical" onClick={handleChange} variant={checkButton=="chemical" ? "contained" : "outlined"}>Chemical</Button>
                <Button value="physical" onClick={handleChange} variant={checkButton=="physical" ? "contained" : "outlined"}>Physical</Button>
            </ButtonGroup>
        </Box> 
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={8}>
              <Paper className={classes.paper}>
                <BarChart dataBar1={data} keyBar1={key} colorBar1={colors}/>
              </Paper>
            </Grid>
            {/* <Grid item xs={12} md={4} lg={4}>
              <Paper className={classes.paper}>
                <ScatterPot />
              </Paper>
            </Grid> */}
          </Grid>
          </Container>
        </main>
    </div>
    )
}
