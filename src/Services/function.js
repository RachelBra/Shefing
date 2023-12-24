export const orderUsers = (data = [])=>{
    var newUser = [];
    data.forEach(user => {newUser.push({id:user.id, name:user.name, email:user.email, company:user.company.name, nameAndEmail:user.name+user.email})})
    return newUser;
}
