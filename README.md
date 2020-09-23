# Ranker App 

## Minimum Viable Product:
User is able to vote on a roster (take a quiz). Like Facemash, two options are presented, user picks one, frontend sends winner to backend.
User is able to see an aggregated ranking of all items in list in order of ELO score, both global (only when they are done to avoid any bias, Global Ranking ELO score not influenced unless quiz is done) and user-specific rankings (maybe updates dynamically as the user casts votes)

### Tech Stack:
- Java (Spring)   
- Heroku  
- AWS  
- Postgres  
- Javascript/React  
- Axios

### Terms:
**Options** - The elements that make up the roster  
**Roster** - A set of options to be voted on  
**Quiz** - The process to vote on a roster  
**Vote** - A single choice between two options  
**Ranking** - The finalized, ordered roster  
**Personal Ranking** - the ranking based on one users votes only  
**Global Ranking** - An average of all the users’ personal rankings  
**Lists** - Rosters and Rankings (depends on completeness)  



