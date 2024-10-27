import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png'
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';

const About = () => {
    const sections = [
        {
          id: 1,
          text: 'Preparing for dangerous storms and making it easier',
          image: image1,
        },
        {
          id: 2,
          text: 'Using trained models to display accurate disaster survival preparedness strategies based on current situations',
          image: image2,
        },
        {
          id: 3,
          text: 'Leveraging React and FastAPI to communicate with Watson',
          image: image3,
        },
        {
          id: 4,
          text: 'We had a wonderful time making this application and learned a lot about Watson technology',
          image: image4,
        },
      ];

  return (
    <Box
      sx={{
        width: '100%',
        overflowY: 'auto',
      }}
    >
      {sections.map((section, index) => {
        const isEven = index % 2 === 0;
        return (
          <Box
            key={section.id}
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: isEven ? 'row' : 'row-reverse',
              },
              alignItems: 'center',
              justifyContent: 'center',
              height: {
                xs: 'auto',
                md: '50vh',
              },
              paddingY: 4,
            }}
          >
            {/* Text Side */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: isEven ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              sx={{
                width: {
                  xs: '100%',
                  md: '50%',
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
              }}
            >
              <Typography sx={{fontSize: "32px", paddingInline: "48px"}} variant="p" align="center">
                {section.text}
              </Typography>
            </Box>

            {/* Image Side */}
            <Box
              sx={{
                width: {
                  xs: '100%',
                  md: '50%',
                },
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component={motion.img}
                src={section.image}
                alt={`Section ${section.id}`}
                initial={{ opacity: 0, x: isEven ? 100 : -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                sx={{
                  width: {
                    xs: '80%',
                    md: '60%',
                  },
                  height: {
                    xs: '200px',
                    md: '80%',
                  },
                  borderRadius: "24px",
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default About;
