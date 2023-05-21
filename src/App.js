import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';

function Stories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      const publicKey = '35d6fbcb2413aab1756a879bb6f3bf8f';
      const privateKey = '267516c272f405cb810a1bfc666dc0bb6c306764';
      const timestamp = Date.now();
      const hash = md5(`${timestamp}${privateKey}${publicKey}`);

      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/stories?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
        );
        setStories(response.data.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="Stories" style={storiesContainerStyle}>
      <h1 style={headerStyle}>Lista de Hisrorias de Marvel</h1>
      <div className="stories-grid" style={storiesGridStyle}>
        {stories.map((story) => (
          <div className="story-card" key={story.id} style={storyCardStyle}>
            {story.thumbnail && story.thumbnail.path && (
              <img src={`${story.thumbnail.path}.${story.thumbnail.extension}`} alt={story.title} style={storyImageStyle} />
            )}
            <p style={storyTitleStyle}>{story.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const storiesContainerStyle = {
  background: 'linear-gradient(135deg, #ff0000, #ff6600, #ffff00, #00ff00, #0066ff, #6600ff)',
  backgroundSize: 'cover',
  padding: '20px',
};

const headerStyle = {
  textAlign: 'center',
  color: 'white',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
};

const storiesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px',
  justifyContent: 'center',
};

const storyCardStyle = {
  textAlign: 'center',
  background: 'white',
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
};

const storyImageStyle = {
  maxWidth: '100%',
  maxHeight: '200px',
  objectFit: 'cover',
};

const storyTitleStyle = {
  fontWeight: 'bold',
};

export default Stories;
