import React, { useEffect, useState} from 'react';
import { Button, Box, AppBar, Toolbar, Container, Typography, Grid, Paper } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Search from './Search';
import Information from './Information';
import Elements from './Elements';

function Catalog() {
    const apiRoot = 'https://swapi.dev/api/';
    const [categories, setCategories] = useState([]);
    let timeOut;

    const searchString = (childdata) => {

        clearTimeout(timeOut);
        
        timeOut = setTimeout(() => {
            fetchElements(apiRoot + currentCategory + "/?search=" + childdata);
        }, 1500)
   
    }

    function checkIfLoggedIn() {

        if (localStorage.getItem("currentUser") === null) {
            window.location.replace("/login");
            return;
        } 
    }

    let [currentCategory, setCurrentCategory] = useState('people');
    let [currentElements, setCurrentElements] = useState([]);

    let [selectionItems, setSelectionItems] = useState([]);

    let [user, setUser] = useState('User');

    let [previousLink, setPreviousLink] = useState(null);
    let [nextLink, setNextLink] = useState(null);

    let [pageIndex, setPageIndex] = useState(1);
    let [totalPages, setTotalPages] = useState('...');

    let [apiIndex, setApiIndex] = useState({});

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        marginTop: 5,
        height: 497,
        color: theme.palette.text.secondary,
    }));

    async function fetchData() {
        let response = await fetch(apiRoot);
        let data = await response.json();
        data = Object.keys(data).map(function(k) { 
            return [k, data[k]] 
        });
        setCategories(data);
    }

    useEffect(() => {
        setUser(localStorage.getItem("currentUser"));
        checkIfLoggedIn();
        fetchData();
        fetchElements(apiRoot + 'people?page=1');
    }, [])

    async function updateElementInfo(category) {
        let link = category[1];
        let categoryName = category[0];

        setTotalPages('...');

        setCurrentCategory(categoryName);
        fetchElements(link, true);
    }

    function logOut() {
        localStorage.removeItem("currentUser");
        window.open("./login","_self");
    }

    async function handleSelectionItems(items) {

        setSelectionItems([["Loading...", [""]]]);

        let cleanItems = [];
        let promises = [];

        for (let i = 0; i < items.length; i++) {

            let [key, value] = items[i];

            if ( key === "url" || key === "created" || key === "edited") {
                continue;
            }

            let cleanKey = key.replaceAll("_", " ");

            if (Array.isArray(value)) {

                let listItem = []

                value.forEach(v => {
                    if (v.startsWith("http")) {
                        let result = fetch(v);
                        promises.push(result);
                        result.then( r => {
                            
                            r.json().then(data => {
                                let keys = Object.keys(data);
                                let title = data[keys[0]];
                                listItem.push([title]);
                            });
                       
                        });
                    }
                });

                cleanItems.push([cleanKey, listItem])

            } else if( typeof value === 'string' && value.startsWith("http")) {

                let result = fetch(value);
                promises.push(result);

                result.then( r => {
                    r.json().then(data => {
                        let keys = Object.keys(data);
                        let title = data[keys[0]];
                        cleanItems.push([cleanKey, [title]])
                    });
                });
            
            } else {

                cleanItems.push([cleanKey, [value]]);

            }

        }

        Promise.allSettled(promises)
            .then((results) => {
                setSelectionItems(cleanItems.map(x => [x[0], x[1].join(", ")]));
            }
        );

    }

    async function fetchElements(link, isSearch) {

        if ( !link) return;

        let data;

        if (apiIndex[link] !== undefined) {
            data = apiIndex[link];
        } else {
            let response = await fetch(link);
            data = await response.json();
            apiIndex[link] = data;
            setApiIndex(apiIndex);
        }

        const pageIndex = (new URL(link)).searchParams.get('page');

        setPreviousLink(data.previous);
        setNextLink(data.next);

        setTotalPages(Math.max(1, 1 + Math.floor((parseInt(data.count) - 1) / 10)));
        setPageIndex(pageIndex ? pageIndex : 1);

        let resultsdata = Object.keys(data.results).map(function(x) {
            let currentElement = data.results[x];
            let title = currentElement[Object.keys(currentElement)[0]];
            currentElement = Object.keys(currentElement).map(function(key) {
                return [key, currentElement[key]];
            });
            return [title, currentElement];
        });

        setCurrentElements(resultsdata);
    }

    return (
        <Container maxWidth="md">
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography id="catalogTitle" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        STAR WARS
                    </Typography>
                    <div className="navButtons">
                    {categories.map((category, key) => (
                         <Button key={category + key} color="default" variant="outlined" onClick={() => updateElementInfo(category)}>{category[0]}</Button>
                    ))}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
        <Grid container spacing={1}>
            <Grid item xs={4}>
                <Search currentCategory={currentCategory} searchString={searchString} />
                <Item>
                    <Elements currentCategory={currentCategory} totalPages={totalPages} fetchElements={fetchElements}
                previousLink={previousLink} nextLink={nextLink} pageIndex={pageIndex}
                handleSelectionItems={handleSelectionItems} currentElements={currentElements} />
                </Item>
                <div id="userWelcome">User: {user} <Button color="primary" variant="outlined"
                onClick={() => logOut()}  >Log out</Button></div>
            </Grid>
            <Grid item xs={8}>
                <Information selectionItems={selectionItems} />
            </Grid>
        </Grid>
        </Container>           
    );
}

export default Catalog;