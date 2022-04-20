export const formData = (state) => {
    console.log(state)
    //un poco de javascript para que reciba los datos el back
const formData =new FormData();
for (let key in state) {
    state[key] !== "" && formData.append([key], state[key]);
}
return formData;
};

