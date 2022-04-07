module.exports = {
    format_date: (date) => {
      if (!date) {
        return date;
      }
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    
    get_emoji: () => {
      const randomNum = Math.random();
       // Return a random emoji
       if (randomNum > 0.7) {
        return `<span><figure class="img ">
        <img class="manimg"src="assets/pic4.jpg" alt="restaurant pics"/>
        </figure></span>`;
      } else if (randomNum > 0.4) {
        return `<span ><span><figure class="img ">
        <img class="manimg"src="assets/picA.jpg" alt="restaurant pics"/>
        </figure></span></span>`;
      }else if (randomNum > 0.2) {
        return `<span ><span><figure class="img ">
        <img class="manimg"src="assets/picB.jpg" alt="restaurant pics"/>
        </figure></span></span>`;
      }
      
      else {
        return  `<span ><span><figure class="img ">
        <img class="manimg"src="assets/picC.jpg" alt="restaurant pics"/>
        </figure></span></span>`;
      }
  
     
    },
  };
  