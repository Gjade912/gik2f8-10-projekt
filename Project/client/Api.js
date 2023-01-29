
class Api {
  
  url = '';

  
  constructor(url) {
    
    this.url = url;
  }

  
  create(data) {
    
    const JSONData = JSON.stringify(data);
    
    console.log(`Sending ${JSONData} to ${this.url}`);

    const request = new Request(this.url, {
      method: 'POST',
      body: JSONData,
      headers: {
        'content-type': 'application/json'
      }
    });

    
    return (
      
      fetch(request)
        
        .then((result) => result.json())
        
        .then((data) => data)
        
        .catch((err) => console.log(err))
    );
  }

  
  getAll() {
    
    return fetch(this.url)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  
  remove(id) {
    
    console.log(`Removing task with id ${id}`);

    
    return fetch(`${this.url}/${id}`, {
      method: 'DELETE'
    })
      .then((result) => result)
      .catch((err) => console.log(err));
  }

  update(id, check, button) {

    console.log(`Updating task with id ${id}`);

    return fetch(this.url, {
      method: 'PATCH',
      body: JSON.stringify({
        id: id,
        check: check,
        button: button
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },

    })
      .then((result) => result)
      .catch((err) => console.log(err));
  }

  
}
