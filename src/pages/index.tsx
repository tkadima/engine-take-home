import { Grid, Typography } from "@mui/material";
import ContentCard from "../app/components/ContentCard";
import axios from "axios";

type AppProps = { 
    contentCards: ContentCard[]
}

const App = ({contentCards}: AppProps) => {
    return <div>
        <Typography variant="h3" >Content Feed </Typography>
        <Grid container columns={{ md: 4 }}>
        {contentCards.map(card => {
            return (<ContentCard key={card.id} imageUri={card.imageUri} textData={card.textData} comments={card.comments}/> )
          })}
        </Grid>
         

    </div>
}

export default App; 

export async function getServerSideProps(){
    const BASE_URL = 'http://localhost:3000'
    const res = (await axios.get(`${BASE_URL}/api/data`)).data;
    const contentCards: ContentCard[]= res;
    return { 
        props: {
            contentCards
        }
    } 
}