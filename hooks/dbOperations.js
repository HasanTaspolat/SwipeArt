function create () {
    setDoc(doc(db, "users", 'LA'), {     
      username: username,
      email: email,
      }).then(() => { 
    // Data saved successfully!
    console.log('data submitted');  

    }).catch((error) => { 
        // The write failed...
      console.log(error);
  });


};

function getSepcificDataWithID () {
      getDoc(doc(db, "users", 'IMx2OXMCR0WD7upXNcKq')).then(docData => { 
  // Data saved successfully!
  
  if (docData.exists()) {

    // console.log(docData.data());
    
    setName(docData.data().username);
    setEmail(docData.data().email);   

  } else {
     console.log('No such a data!');
  }

}).catch((error) => {
      // The write failed...
      console.log(error);
})
}

function update() {
updateDoc(doc(db, "users", 'LA'), {     
  username: username,
  email: email,
}).then(() => { 
  // Data saved successfully!
  console.log('data submitted');  

}).catch((error) => {
      // The write failed...
      console.log(error);
});
}

function deleteData() {
      deleteDoc(doc(db, "users", 'LA'));    
}

function getAlldata() {
  getDocs(collection(db, "users")).then(docSnap => {
    let users = [];
    docSnap.forEach((doc)=> {
        users.push({ ...doc.data(), id:doc.id })
    });
        console.log("Document data:", users);       
  });
}

function getDataWithQuery () {
  getDocs(query(collection(db, "users"), where('email','==', 'NewUser@gmail.com'))).then(docSnap => {
     let users = []; 
      docSnap.forEach((doc)=> {
      users.push({ ...doc.data(), id:doc.id })
  });
      console.log("Document data:", users[0].username);           
  });
}