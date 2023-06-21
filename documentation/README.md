
# Documentation
# **Shopping List Client**

This is a VUE.JS Client for consulting a shoppinglist without JWT authentication and managing the list (updating product quantities, adding/removing products) via a  backoffice using JWT authentication.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
# **Shopping List Server**
This is a multilayered Laravel application.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)  
Make sure to have a [working Vagrant Environment](https://www.vagrantup.com/) set-up on your device.  

## Project Setup
```sh
cd toYourVagrantProjectsDirectory
git clone https://git.ti.howest.be/TI/2022-2023/s4/web-frameworks/projects/_groups/group-09/server
```
Make sure to add your custom ip-address to your **hosts** file and update your **homestead.yaml** file.

**!!** Make sure to **CHANGE** the **URL** in the **ShopListService.js** file to your own.

# **Features**
- **ShoppingList Screen (home)**
  - Watching the products that are currently in the shoppinglist
  - Reduce or increase the amount of products shown per page
  - Paginate trough the amount of pages
  - Change your page number to a specific page
  - Change the language to Dutch or English

# **Known Bugs**
- When logging in to the back office, the style of the "Create a new product" form is not the actual style applied to it, it's "inheriting" the style of the previous page. 
  - **Solution**: refreshing page
![](https://i.gyazo.com/5cda225b1f708cbe1245295a41f06562.png)  


- After a while or restarting/updating/... the laravel server, the JWT TOKEN gets experided. Because there is still 'a' token in Localstorage permission to the back office will be granted. The problem here is that you will not be able to perform actions to the data. (Internal Server Error: 500)
  - **Solution**: (Click the logout button and) log in again.
![](https://i.gyazo.com/5a2ce8eec22b55173a1f24db95a0b747.png)

- Don't know if this counts as an bug but in the backoffice, the sorting is happening based on the Dutch values. (this is own decision)