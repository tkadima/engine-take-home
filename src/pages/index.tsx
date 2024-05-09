import { Grid } from "@mui/material";
import ContentCard from "../app/components/ContentCard";

type AppProps = { 
    contentCards: ContentCard[]
}

const App = ({contentCards}: AppProps) => {
    return <div>
        <h1>Content Feed </h1>
        <Grid container columns={{ md: 5 }}>
        {contentCards.map(card => {
            return (<ContentCard key={card.id} imageUri={card.imageUri} textData={card.textData} comments={card.comments}/> )
          })}
        </Grid>
         

    </div>
}

export default App; 

export async function getServerSideProps(){
    const res = await fetch('https://stoplight.io/mocks/engine/fullstack-spec/52502230/content', {
        headers: {
          'Accept': 'application/json',
          'Prefer': 'code=200, dynamic=true'
        }
      });
      const data = await res.json();
      const contentCards: ContentCard []= data.contentCards
      return {
        props: {
            contentCards
        }
      };
}