
const profiles = {
  'Primo Softshit': {
    music: 'primo.mp3'
  },
  'Mk Softshit': {
    music: 'mk.mp3'
  },
  'Woozie Softshit': {
    music: 'woozie.mp3'
  },
  'Alfie Softshit': {
    music: 'alfie.mp3'
  },
  'Juanito Softshit': {
    music: 'juanito.mp3'
  },
  'Tanggol Softshit': {
    music: 'tanggol.mp3'
  },
  'Trevs Softshit': {
    music: 'trevs.mp3'
  },
  'Keyoz Softshit': {
    music: 'keyoz.mp3'
  }
};


const audioElements = {};
Object.keys(profiles).forEach(name => {
    try {
      const audio = new Audio(profiles[name].music);
      audio.loop = false; 
      audio.muted = false;
      
      
      audio.addEventListener('error', (e) => {
        console.error(`Error loading ${profiles[name].music}:`, e);
        console.log('Error details:', audio.error);
        card.querySelector('.profile-img').classList.add('error');
      });
      
      audio.addEventListener('canplaythrough', () => {
        console.log(`${profiles[name].music} loaded successfully`);
        console.log('Audio ready state:', audio.readyState);
      });
      
      
      audio.addEventListener('play', () => {
        console.log(`${profiles[name].music} started playing`);
      });
      
      audio.addEventListener('blocked', () => {
        console.warn(`Playback blocked for ${profiles[name].music}`);
        card.querySelector('.profile-img').classList.add('error');
      });
      
      audioElements[name] = audio;
  } catch (error) {
    console.error(`Failed to create audio for ${name}:`, error);
  }
});


document.querySelectorAll('.profile-card').forEach(card => {
  const profileName = card.querySelector('h3').textContent;
  const audio = audioElements[profileName];
  
  if (!audio) return;

  card.addEventListener('mouseenter', () => {
   
    document.querySelectorAll('.profile-img').forEach(img => {
      img.classList.remove('playing');
      img.classList.remove('error');
    });
    Object.values(audioElements).forEach(a => a.pause());
    
   
    try {
      audio.currentTime = 0;
      
      
      if (audio.muted) {
        audio.muted = false;
        console.log('Audio was muted - unmuted');
      }
      
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log(`Playing ${profiles[name].music} successfully`);
          })
          .catch(error => {
            console.error(`Playback failed for ${profiles[name].music}:`, error);
            console.log('Suggested solution:', 
              'User interaction may be required before audio can play');
            card.querySelector('.profile-img').classList.add('error');
            
           
            card.addEventListener('click', () => {
              audio.play().catch(e => console.error('Retry failed:', e));
            }, { once: true });
          });
      }
      
      card.querySelector('.profile-img').classList.add('playing');
    } catch (error) {
      console.error(`Error playing ${profiles[name].music}:`, error);
      card.querySelector('.profile-img').classList.add('error');
    }
  });

  card.addEventListener('mouseleave', () => {
    audio.pause();
    card.querySelector('.profile-img').classList.remove('playing');
  });

  
  audio.addEventListener('ended', () => {
    card.querySelector('.profile-img').classList.remove('playing');
  });
});
