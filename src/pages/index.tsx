import ContentCard from "../app/components/ContentCard";
import { ThemeProvider, createTheme } from '@mui/material/styles';


type AppProps = { 
    contentCards: ContentCard[]
}
const theme = createTheme();

const App = ({contentCards}: AppProps) => {
    return <ThemeProvider theme={theme}><div>Home
          {contentCards.map(card => {
            return (<ContentCard key={card.id} imageUri={card.imageUri} textData={card.textData} comments={card.comments}/> )
          })}

    </div></ThemeProvider>
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