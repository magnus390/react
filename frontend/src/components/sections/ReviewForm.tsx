import { Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { decode } from "punycode";
import React, { useState } from "react";

export default function FormComponent(props: any) {
    const [reviews, setReviews] = useState("");
    const onChange = (e: any) => {
        setReviews(e.target.value);
    };
    const onSubmit = async (e: any) => {
        let userDetail = JSON.parse(localStorage.getItem("user") ?? "");

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_BACKEND}api/item/review/${props.currentItem}`,
                {
                    reviews: reviews,
                }
            );
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="form-container">
            <form>
                <Input
                    className="reviews-form"
                    type="text"
                    placeholder="enter you reviews"
                    value={reviews}
                    onChange={onChange}
                />
                <span>
                    <Button onClick={onSubmit} type="button">
                        Submit
                    </Button>
                </span>
            </form>
        </div>
    );
}