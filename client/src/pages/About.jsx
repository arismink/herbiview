import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { 
  Box, Container, Typography, Card, CardActions, CardContent 
} from "@mui/material";

export default function Login() {

  const card1 = (
    <>
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Team Member
        </Typography>
        <Box 
          component="img"
          sx={{
            objectFit: "cover",
            maxWidth: "90%",
            marginBottom: "1em"
          }}
          alt="Krismina La"
          src="https://ca.slack-edge.com/T2G8TE2E5-U035ZEQ2FKM-b4433df87408-512"
        />
        <Typography variant="h5" component="div" gutterBottom>
          Krismina La
        </Typography>
        <Typography variant="body1">
          Aspiring developer with industry experience in federal government, education and oil & gas. Passionate, motivated to learn and driven about creating exceptional end-user experiences, I build things that live on the web.
        </Typography>
      </CardContent>
      <CardActions sx={{ 
        display: 'flex', 
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center", 
      }}>
        <a href="https://github.com/arismink" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon size="2x" icon={faGithubSquare} />
        </a>
        <a href="https://www.linkedin.com/in/krismina" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon size="2x" icon={faLinkedin} />
        </a>
      </CardActions>
    </>
  );

  const card2 = (
    <>
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Team Member
        </Typography>
        <Box 
          component="img"
          sx={{
            objectFit: "cover",
            maxWidth: "90%",
            marginBottom: "1em"
          }}
          alt="Kai Meikle"
          src="https://media-exp1.licdn.com/dms/image/C5603AQHOcJI9AwvyVQ/profile-displayphoto-shrink_400_400/0/1650678558606?e=1658966400&v=beta&t=teSOMQorZPGlzkz_8HynuSDTA1b24wDj9kKicw0tLLg"
        />
        <Typography variant="h5" component="div" gutterBottom>
          Kai Meikle
        </Typography>
        <Typography variant="body1">
          <i>"If you encounter a bug don't panic, call me and I'll tell you a joke."</i>
        </Typography>
      </CardContent>
      <CardActions sx={{ 
        display: 'flex', 
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center", 
      }}>
        <a href="https://github.com/kai-commits" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon size="2x" icon={faGithubSquare} />
        </a>
        <a href="https://www.linkedin.com/in/kaimeikle123" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon size="2x" icon={faLinkedin} />
        </a>
      </CardActions>
    </>
  );

  const card3 = (
    <>
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Team Member
        </Typography>
        <Box 
          component="img"
          sx={{
            objectFit: "cover",
            maxWidth: "90%",
            marginBottom: "1em"
          }}
          alt="Nathan Tsang"
          src="https://ca.slack-edge.com/T2G8TE2E5-U035N9XRVB7-a9fea2902550-512"
        />
        <Typography variant="h5" component="div" gutterBottom>
          Nathan Tsang
        </Typography>
        <Typography variant="body1">
          Adept at thyme management.
        </Typography>
      </CardContent>
      <CardActions sx={{ 
        display: 'flex', 
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center", 
      }}>
        <a href="https://github.com/nathan-ts" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon size="2x" icon={faGithubSquare} />
        </a>
        <a href="https://www.linkedin.com/in/npytsang/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon size="2x" icon={faLinkedin} />
        </a>
      </CardActions>
    </>
  );

  const formatCard = function(card) {
    return (
      <Card 
        elevation={6}
        sx={{
          display: 'flex',
          flexDirection: "column",
          flex: 1,
          margin: "1em",
          justifyContent: "space-between"
        }}
      >
        {card}
      </Card>
    );
  }

  return (
    <Container
      sx={{
        textAlign: "center",
      }}
      maxWidth="lg"
    >
      <Box mb={18}/>
      <Typography variant="h4" margin={2}>About Us</Typography>
      <Container
        sx={{
          width: "100%",
          display: 'flex',
          alignItems: "stretch",
          flexWrap: "nowrap",
          flexDirection: { xs: "column", md: "row"}
        }}
        
      > 

        {formatCard(card1)}
        {formatCard(card2)}
        {formatCard(card3)}

      </Container>
      <Box mb={12}/>
    </Container>
  );
}
