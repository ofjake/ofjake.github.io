const gamify = {
    points: 0,
    quests: {
      scroll: false,
      help: false,
      go: false
    },

    checkQuests() {
      if (this.quests.scroll) {
        const questDiv = document.getElementById('scroll-quest');
        if (questDiv && !questDiv.classList.contains('fade-quest')) {
          questDiv.classList.add('fade-quest');
          setTimeout(() => questDiv.style.display = 'none', 1200);
        }
      }
      Object.keys(this.quests).forEach(key => {
        if (key !== 'scroll' && this.quests[key]) {
          const questDiv = document.getElementById(`click-quest`);
           if (questDiv && !questDiv.classList.contains('fade-quest')) {
            questDiv.classList.add('fade-quest');
            setTimeout(() => questDiv.style.display = 'none', 1200);
          }
        }
      });

      const completed = Object.values(this.quests).filter(v => v).length;
      this.points = completed * 50;
      document.getElementById('points').textContent = `Points: ${this.points}`;

      if (completed === 1) {
        document.getElementById('badges').innerHTML = '<div class="badge badge-blue">Starter</div>';
      } else if (completed === 2) {
        document.getElementById('badges').innerHTML = '<div class="badge badge-green">Explorer</div>';
      } else if (completed === 3) {
        document.getElementById('badges').innerHTML = '<div class="badge badge-red">Expert</div>';
      }
    }
  };

  window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 50) {
      gamify.quests.scroll = true;
      gamify.checkQuests();
    }
  });

  document.querySelectorAll('.quest-button').forEach(button => {
    button.addEventListener('click', () => {
      const questKey = button.getAttribute('data-quest');
      if (questKey && !gamify.quests[questKey]) {
        gamify.quests[questKey] = true;
        gamify.checkQuests();
      }
    });
  });