import { memo } from 'react';
// materialUI
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

const FooterContainer = styled('div')({
  backgroundColor: '#494949',
  margin: '0 auto',
  paddingTop: '30px',
  paddingBottom: '30px',
  color: '#f2f2f2',
  letterSpacing: '0.08rem',
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
});

export const Footer = memo(() => {
  return (
    <FooterContainer>
      <Grid item xs={10} md={8}>
        <Grid item sx={{ textAlign: 'center' }}>
          <a href='https://twitter.com/napi_nami'>
            <TwitterIcon sx={{ m: 1 }} />
          </a>
          <a href='https://github.com/hinakonagao'>
            <GitHubIcon sx={{ m: 1 }} />
          </a>
        </Grid>
        <Typography variant='body2' sx={{ textAlign: 'center', fontWeight: '200' }}>
          © 2022 hinako blog
        </Typography>
      </Grid>
    </FooterContainer>
  );
});
