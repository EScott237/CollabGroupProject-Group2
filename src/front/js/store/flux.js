// const getState = ({ getStore, getActions, setStore }) => {
// 	return {
// 		store: {
// 			token: null,
// 			artPieces : [],
// 			artDepartments: [],
// 			bool : false
// 		},
// 		actions: {

// 		onLoginClick: async (email, password) => {
// 			const store = getStore()
// 			console.log(email, password);
// 			const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
// 				method: 'POST',
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify({ email: email, password: password })
// 			});
			
// 			if (response.ok) {
			
// 				const data = await response.json();
// 				sessionStorage.setItem("token", data.access_token);
// 				setStore({token:data.access_token})
// 				console.log(store.token);

// 			} else {
// 				 // Handle unsuccessful login attempts here, maybe set a message to display to the user
// 				setMessage(<span className="text-danger">Invalid login, please try again.</span>);
// 			}},

// 		redirecting: async () => {
// 			const store = getStore()
// 			console.log(sessionStorage.getItem("token"))
// 			if(sessionStorage.getItem("token")){
// 				setStore({token: sessionStorage.getItem("token")})
// 				setStore({bool:true})
// 				// console.log(store.bool)
// 			}
			
// 		},

// 		rehydrate: () => {
// 			const token = sessionStorage.getItem("token");
// 			if (token){
// 				setStore({ token: token });
// 			}
// 		},

// 		logOut: () => {
// 			const store = getStore()
// 			setStore({token:null})
// 			sessionStorage.clear();
// 		}, 
			
// 		getObjects: () => {
// 			for (let i = 438815; i < 438899; i++){
// 				fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/"+i)
// 				.then(response => response.json())
// 				.then(data => {
// 					let store = getStore()
// 					if (data.objectName && data.primaryImageSmall){
// 						store.artPieces.push(data)
// 						setStore(store)
// 					}
// 				})

// 			}
// 		},
// 		getDepartments: () => {
// 				fetch("https://collectionapi.metmuseum.org/public/collection/v1/departments")
// 				.then(response => response.json())
// 				.then(data => {
// 					let store = getStore()
// 						setStore({artDepartments: data.departments})
// 						console.log(store.artDepartments)
// 				})

// 			},
// 		// GET (by department) - > https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1 
		
// 		usersFavoritePage: async () => {
// 			const store = getStore()
// 			const response = await fetch(`${process.env.BACKEND_URL}/api/private`, {headers: {Authorization: store.token }})  
// 			if (!response.ok) {console.error("Failed to fetch user's information")}
// 		},
// 		authenticateUser: async () => {
// 			console.log("I'm runnning :)")
// 			try{
// 				let response = await fetch(`${process.env.BACKEND_URL}/api/private`, {headers: {Authorization: "Bearer "+ sessionStorage.getItem("token") }})
// 				if (!response.ok){
// 					console.log("Failed to authenticate the user. Your token may be invalid or expired")
// 					return false
// 				}else{
// 					console.log("this message is from authenticateUser",response.json())
// 					return true
// 				}
// 				}catch(error){
// 					console.log(error)
// 				}
// 			},

// 		}
// 	};
// };

// export default getState;

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
            artPieces: [],
            artDepartments: [],
            bool: false
        },
        actions: {
            onLoginClick: async (email, password) => {
                const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }) 
                });

                if (response.ok) {
                    const data = await response.json();
                    sessionStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token, bool: true }); 
                    return true; // Indicate login success
                } else {
                    return false; // Indicate login failure without setting a message here
                }
            },

            redirecting: async () => {
                const token = sessionStorage.getItem("token");
                if (token) {
                    setStore({ token, bool: true });
                }
            },

            rehydrate: () => {
                const token = sessionStorage.getItem("token");
                if (token) {
                    setStore({ token });
                }
            },

            logOut: () => {
                setStore({ token: null });
                sessionStorage.clear();
            },

            getObjects: () => {
                for (let i = 438815; i < 438899; i++) {
                    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${i}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.objectName && data.primaryImageSmall) {
                                const store = getStore();
                                store.artPieces.push(data);
                                setStore({ artPieces: store.artPieces });
                            }
                        });
                }
            },

            getDepartments: () => {
                fetch("https://collectionapi.metmuseum.org/public/collection/v1/departments")
                    .then(response => response.json())
                    .then(data => {
                        setStore({ artDepartments: data.departments });
                    });
            },

            usersFavoritePage: async () => {
                const store = getStore();
                const response = await fetch(`${process.env.BACKEND_URL}/api/private`, { headers: { Authorization: store.token } });
                if (!response.ok) {
                    console.error("Failed to fetch user's information");
                }
            },

            authenticateUser: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/private`, { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } });
                    if (!response.ok) {
                        console.log("Failed to authenticate the user. Your token may be invalid or expired");
                        return false;
                    } else {
                        console.log("User authenticated successfully");
                        return true;
                    }
                } catch (error) {
                    console.log("Authentication error:", error);
                    return false;
                }
            },
        }
    };
};

export default getState;
