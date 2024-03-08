import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            auth: false,
            events: [],
            user: [],
            eventInfo: null,
        },

        actions: {

            obtenerInfoUsuario: async () => {
                let token = localStorage.getItem("token");
                try {
                    const res = await fetch(process.env.BACKEND_URL + "/api/user/details", {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                    const data = await res.json()
                    setStore({ user: data.details })
                } catch (error) {
                    console.error(error)
                }
            },

            obtenerEventos: async () => {
                try {
                    const res = await fetch(process.env.BACKEND_URL + "/api/events")
                    const data = await res.json()
                    setStore({ events: data.results })

                } catch (error) {
                    console.error(error)
                }
            },


            obtenerOneEvento: async (id) => {
                try {
                    const res = await fetch(process.env.BACKEND_URL + `/api/events/${id}`)
                    const data = await res.json()
                    setStore({ eventInfo: data })

                } catch (error) {
                    console.error(error)
                }
            },

            login: async (email, password) => {
                try {
                    let response = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            "email": email,
                            "password": password
                        })
                    });
                    let data = await response.json();
                    if (response.status === 200) {
                        localStorage.setItem("token", data.access_token);
                        localStorage.setItem("user", data.user.name);
                        localStorage.setItem("email", data.user.email);
                        localStorage.setItem("id", data.user.id);
                        setStore({ auth: true })
                    }
                    else {
                        toast.error(data.msg)
                    }

                } catch (error) {
                    console.log(error);
                }
            },


            validate_token: async () => {
                let token = localStorage.getItem("token")

                if (token) {
                    try {
                        let response = await fetch(process.env.BACKEND_URL + "/api/validate_token", {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        if (response.status >= 200 && response.status < 300) {
                            await setStore({ auth: true })
                            await getActions().obtenerInfoUsuario()
                        }
                        else {
                            setStore({ auth: false });
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            localStorage.removeItem("email");
                            localStorage.removeItem("id");
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            },

            register: async (name, email, password) => {
                try {
                    let response = await fetch(process.env.BACKEND_URL + "/api/signup", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            "name": name,
                            "email": email,
                            "password": password
                        })
                    });

                    let data = await response.json();

                    if (response.status >= 200 && response.status < 300) {
                        return true; // Registro exitoso
                    } else {
                        toast.error(data.msg)
                        return false;
                    }
                } catch (error) {
                    console.error(error);
                    return false;
                }
            },



            obtenerEventosCategoria: async (category) => {

                try {
                    const res = await fetch(process.env.BACKEND_URL + `/api/events/${category}`)
                    const data = await res.json()
                    setStore({ events: data.result })


                } catch (error) {
                    console.error(error)
                }
            },

            uploadImage: async (body) => {
                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/` + process.env.IMAGE_IMPORT + `/image/upload`,
                    {
                        method: "POST",
                        body: body
                    }
                )
                const data = await res.json();
                return (data.secure_url)
            },


            inscripcionEvento: async (id) => {
                let token = localStorage.getItem("token")

                try {
                    let response = await fetch(process.env.BACKEND_URL + `/api/asistir/${id}`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }

                    });
                    let data = await response.json();
                    if (response.status >= 200 && response.status < 300) {

                        await getActions().obtenerOneEvento(id)
                        await getActions().obtenerInfoUsuario()

                        // localStorage.setItem("token", data.access_token);
                        // setStore({ auth: true })
                        console.log(data);
                        return true;
                    }
                    else {
                        toast.error(data.msg)
                    }

                } catch (error) {
                    console.log(error);
                    return false;
                }
            },

            sendPWDRestoration: async (email) => {
                try {
                    let response = await fetch(process.env.BACKEND_URL + "/api/send_pwd_restoration", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "email": email
                        })
                    });
                    let data = await response.json();
                    if (response.status >= 200 && response.status < 300) {
                        toast.success(data.msg)
                        return true;
                    } else {
                        toast.error(data.msg);
                        return false;
                    }
                } catch (error) {
                    toast.error(error);
                    console.log(error);
                    return false;
                }
            },
            restorePassword: async (new_password, token) => {
                try {
                    console.log(new_password);
                    let response = await fetch(process.env.BACKEND_URL + `/api/restore_password/${token}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "new_password": new_password
                        })
                    });
                    let data = await response.json();
                    if (response.status >= 200 && response.status < 300) {
                        toast.success(data.msg)
                        return true;
                    } else {
                        toast.error(data.msg);
                        return false;
                    }
                } catch (error) {
                    toast.error(error);
                    console.log(error);
                    return false;
                }
            },

            getCategories: async () => {
                try {
                    const res = await fetch(process.env.BACKEND_URL + `/api/categories`)
                    const data = await res.json()
                    setStore({ categories: data.results })

                } catch (error) {
                    console.error(error)
                }
            },

            crearEvento: async (datosEvento) => {
                let token = localStorage.getItem("token");
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/event", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify(datosEvento),
                    });
                    const data = await response.json();
                    if (response.status >= 200 && response.status < 300) {
                        // Actualizar el estado con el resultado exitoso
                        setStore((prevState) => ({
                            ...prevState,
                            events: [...prevState.events, data], // asumiendo que 'data' contiene el evento creado
                            feedback: { type: 'success', message: 'Event created successfully.' },
                        }));
                        toast.success("Event created successfully.");
                        getActions().obtenerEventos(); // Actualiza la lista de eventos
                    } else {
                        // Actualizar el estado con el error
                        setStore((prevState) => ({
                            ...prevState,
                            feedback: { type: 'error', message: `Error while creating the event: ${data.msg}` },
                        }));
                        toast.error(data.msg);
                    }
                } catch (error) {
                    console.error("Error while creating the event:", error);
                    toast.error("Error while creating the event.");
                    setStore((prevState) => ({
                        ...prevState,
                        feedback: { type: 'error', message: 'Error while creating the event. Try again.' },
                    }));
                }
            },


            eliminarEvento: async (id) => {
                let token = localStorage.getItem("token");

                try {
                    let response = await fetch(process.env.BACKEND_URL + `/api/event/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    let data = await response.json();
                    if (response.status >= 200 && response.status < 300) {
                        // Elimina el evento del estado
                        // setStore(prevState => ({
                        //     events: prevState.events.filter(event => event.id !== id)
                        // }));
                        toast.success("Event deleted.");
                    } else {
                        toast.error(data.msg);
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Error while deleting the event.");
                }
            },

            dejarDeAsistirEvento: async (id) => {
                let token = localStorage.getItem("token");
                try {
                    let response = await fetch(process.env.BACKEND_URL + `/api/asistir/${id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    let data = await response.json();
                    if (response.status === 200) {
                        await getActions().obtenerOneEvento(id);
                        await getActions().obtenerInfoUsuario();
                        return true;
                    } else {
                        toast.error(data.msg);
                        return false;
                    }
                } catch (error) {
                    console.log(error);
                    return false;
                }
            },

            actualizarEvento: async (id, newData) => {
                let token = localStorage.getItem("token");
                try {
                    let response = await fetch(process.env.BACKEND_URL + `/api/event/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(newData) // Los nuevos datos que quieres actualizar
                    });

                    let data = await response.json();
                    if (response.status >= 200 && response.status < 300) {
                        // Actualiza el estado con los nuevos datos del evento
                        await getActions().obtenerOneEvento(id);

                        toast.success("Event data successfully updated.");
                    } else {
                        toast.error(data.msg);
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Error while updating the event.");
                }
            },

            actualizarUsuario: async (id, newData) => {
                console.log(id);
                console.log(newData);
                let token = localStorage.getItem("token");
                try {
                    let response = await fetch(process.env.BACKEND_URL + `/api/user/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(newData) // Los nuevos datos que quieres actualizar
                    });

                    let data = await response.json();
                    if (response.status >= 200 && response.status < 300) {
                        // Actualiza el estado con los nuevos datos del usuario
                        // await getActions().obtenerInfoUsuario();
                        localStorage.setItem("user", newData.name);
                        localStorage.setItem("email", newData.email);
                        toast.success("User data successfully updated.");
                    } else {
                        toast.error(data.msg);
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Error while updating user.");
                }
            }

        }
    }
};






export default getState;