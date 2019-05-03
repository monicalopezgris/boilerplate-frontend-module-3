import React, { Component } from "react";
import doc from "./doc-service";
const { Consumer, Provider } = React.createContext();

export { Consumer };

export const withDoc = Comp => {
  return class WithDoc extends Component {
    render() {
      
      return (
        <Consumer>
          {docStore => {
            return (
              <Comp
                get={docStore.get}
                bills={docStore.state.bills}
                state={docStore.state}
                add={docStore.add}
                update={docStore.update}
                delete={docStore.delete}
                storeCurrent={docStore.storeCurrent}
                onChange={docStore.onChange}
                onSubmit={docStore.onSubmit}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

class DocProvider extends Component {
  state = {
    isLoading: true,
    bills: [],
    current:{},
    doc,
  };

  get = () => {
    doc.get()
    .then((data) => {
      this.setState({
        bills:data,
        isLoading:false,
      });
    })
    .catch((error) =>{
      throw new Error(error);
    })
  }

  add = (inputData) => {
    doc.add(inputData)
      .then((data) => {
        this.setState({
          isLoading:false,
         });
      })
      .catch((error) =>{
        throw new Error(error);
      }
      )
  }

  update = (id, inputData) => {
    doc.update(id, inputData)
      .then((data) => {
        this.setState({
          isLoading:false,
         });
      })
      .catch((error) =>{
        throw new Error(error);
      })
  }

  delete = (id) => {
    doc.del(id)
      .then((data) => {
        this.setState({ 
          isLoading:false,
         });
      })
      .catch((error) =>{
        throw new Error(error);
      })
  }

  // not used
  getByRef = (ref) => {
    doc.get(ref)
      .then((data)=>{
      })
      .catch((error) =>{
        throw new Error(error);
      })
  }

  storeCurrent = (item) => {
    const {
      _id,
      ref,
      createdAt,
      updatedAt,
      data:{
        client:{
          name, 
          nif, 
          address:{
            street, 
            streetNum, 
            postalCode,
            country
          }
        }
      }
    } = item;

    const items = item.data.items;

    this.setState(prevState => ({
      current: {
        ...prevState.current,
        _id,
        ref,
        createdAt,
        updatedAt,
        name,
        nif,
        street,
        streetNum,
        postalCode,
        country,
        items,
      }
    }))

  }

  onSubmit = (values, update) => {
    if (update) {
      this.update(values.id, values)
    } else {
      this.add(values)      
    }
  }


  render() {
    return(
      <Provider
        value={{
          get: this.get,
          state: this.state,
          add: this.add,
          update:this.update,
          delete: this.delete,
          storeCurrent:this.storeCurrent,
          onChange: this.onChange,
          onSubmit: this.onSubmit,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export default DocProvider;
