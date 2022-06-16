import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { AiFillHeart, AiFillEdit, AiFillDelete } from "react-icons/ai";
import axios from "axios";
import styles from "./Card.module.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
} from "reactstrap";

const Card = () => {
  const [data, setData] = useState([]);

  const [basicModal, setBasicModal] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    selectedId: null,
  });

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setData(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    data.filter((item) => {
      if (item.id === id) {
        setData(data.filter((item) => item.id !== id));
      }
    });
  };

  const handleEdit = (id) => {
    setBasicModal(!basicModal);
    data.filter((item) => {
      if (item.id === id) {
        setFormState({
          ...formState,
          name: item.name,
          email: item.email,
          phone: item.phone,
          website: item.website,
          selectedId: item.id,
        });
      }
    });
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const saveEditedData = () => {
    data.filter((item) => {
      if (item.id === formState.selectedId) {
        setData(
          data.map((item) => {
            if (item.id === formState.selectedId) {
              return {
                ...item,
                name: formState.name,
                email: formState.email,
                phone: formState.phone,
                website: formState.website,
              };
            }
            return item;
          })
        );
      }
    });
    setBasicModal(!basicModal);
  };

  return data.map((item) => {
    return (
      <>
        <Modal isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
          <ModalHeader toggle={() => setBasicModal(!basicModal)}>
            Basic Modal
          </ModalHeader>
          <ModalBody>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              defaultValue={formState.name}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              defaultValue={formState.email}
              onChange={(e) => handleChange(e)}
            />
            <Label>Phone</Label>
            <Input
              type="text"
              name="phone"
              defaultValue={formState.phone}
              onChange={(e) => handleChange(e)}
            />
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              defaultValue={formState.website}
              onChange={(e) => handleChange(e)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={saveEditedData}>
              Accept
            </Button>
          </ModalFooter>
        </Modal>
        <div
          className={classNames([styles.wrapper, styles.wrapperAnime])}
          key={item.id}
        >
          <div className={styles.header}>
            <div className={styles.imageWrapper}>
              <img
                src={`https://avatars.dicebear.com/v2/avataaars/${item.name}.svg?options[mood][]=happy`}
                className={styles.image}
                alt=""
              />
            </div>
            <div className={styles.badgeWrapper}>
              <div
                className={classNames([styles.dangerBadge, styles.badgeAnime])}
              >
                <AiFillHeart />
              </div>
              <div
                className={classNames([styles.dangerBadge, styles.badgeAnime])}
              >
                <AiFillDelete onClick={() => handleDelete(item.id)} />
              </div>
              <div
                className={classNames([styles.dangerBadge, styles.badgeAnime])}
              >
                <AiFillEdit
                  onClick={() => {
                    handleEdit(item.id);
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.textWrapper} key={item.id}>
            <h1 className={styles.text}>{item.name}</h1>
            <h1 className={styles.text}>{item.email}</h1>
            <h1 className={styles.text}>{item.phone}</h1>
            <h1 className={styles.text}>{item.website}</h1>
          </div>
        </div>
      </>
    );
  });
};

export default Card;
