'use client'

import { NextPage } from "next";
import { useState } from "react";

//Material UI
import Carousel from 'react-material-ui-carousel'

//Custom
import Card from "@components/Card";
import { Button, Paper, Typography, Container, Alert } from "@mui/material";
import { AccessAlarm as AccessAlarmIcon } from "@mui/icons-material";

const ViewRecipePage: NextPage = () => {

    let [recipe, setRecipe] = useState({
        title: 'Teste',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu.`,
        ingredients: [],
        author: {
            fullName: 'Luidy Moura'
        },
        preparetionTimeFormated: '01:30'
    });

    return (
        <Container className="mt-10">
            <div style={{borderBottom: '1px solid #494949'}}>
                <Typography color="text.primary" variant="h2">
                    <b>{recipe.title}</b>
                </Typography>
                <Typography color="text.primary" variant="subtitle2">
                    Autor: {recipe?.author?.fullName}
                </Typography>
            </div>
            <div className="p-4 md:grid md:grid-cols-2 gap-2">
                <div>
                    <Typography color="text.primary" variant="body1">
                        <b>Descrição:</b>
                    </Typography>
                    <Typography color="text.primary" variant="body2">
                        {recipe.description}
                    </Typography>
                    <Alert variant="outlined" severity="info" className="mt-4" color="primary" icon={<AccessAlarmIcon />}>
                        <b>Tempo de preparo:</b> {recipe.preparetionTimeFormated}
                    </Alert>
                </div>
                <div className="mt-4 md:mt-0">
                    <Carousel 
                        className="w-full"
                        fullHeightHover={false}
                        autoPlay={true}
                        indicators={false}
                    >
                        <Paper variant="elevation-0" square className="flex justify-center bg-transparent">
                            <img style={{width: '100%'}} src="https://imgs.search.brave.com/M1SE2lGAVDruv-XeTPjF5fkoZIxk3yShX7SozVY8hQk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZWVrc2Zvcmdl/ZWtzLm9yZy93cC1j/b250ZW50L2Nkbi11/cGxvYWRzLzIwMjMw/MzEzMTgzMzUyL1Jl/YWN0LU1hdGVyaWFs/LVVJLTIucG5n" />
                        </Paper>
                        <Paper variant="elevation-0" square className="flex justify-center bg-transparent">
                            <img style={{width: '100%'}} src="https://imgs.search.brave.com/8uZdF-sjgkUhuxCZ-f8XKldmCa9lOGLZUWEnhi-gnnI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZWVrc2Zvcmdl/ZWtzLm9yZy93cC1j/b250ZW50L2Nkbi11/cGxvYWRzLzIwMjMw/MjE2MTgwMzE2L2Qz/LWpzLXR1dG9yaWFs/LnBuZw" />
                        </Paper>
                    </Carousel>
                </div>
            </div>

            {/*<Carousel 
                className="w-full"
                fullHeightHover={false}
                autoPlay={true}
                indicators={false}
            >
                <Paper variant="elevation-0" square className="flex justify-center bg-transparent">
                    <img style={{width: '100%'}} src="https://imgs.search.brave.com/M1SE2lGAVDruv-XeTPjF5fkoZIxk3yShX7SozVY8hQk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZWVrc2Zvcmdl/ZWtzLm9yZy93cC1j/b250ZW50L2Nkbi11/cGxvYWRzLzIwMjMw/MzEzMTgzMzUyL1Jl/YWN0LU1hdGVyaWFs/LVVJLTIucG5n" />
                </Paper>
                <Paper variant="elevation-0" square className="flex justify-center bg-transparent">
                    <img style={{width: '100%'}} src="https://imgs.search.brave.com/8uZdF-sjgkUhuxCZ-f8XKldmCa9lOGLZUWEnhi-gnnI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZWVrc2Zvcmdl/ZWtzLm9yZy93cC1j/b250ZW50L2Nkbi11/cGxvYWRzLzIwMjMw/MjE2MTgwMzE2L2Qz/LWpzLXR1dG9yaWFs/LnBuZw" />
                </Paper>
            </Carousel>*/}
        </Container>
    );
};

export default ViewRecipePage;
