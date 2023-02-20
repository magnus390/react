import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Card,
    CardSubtitle,
    CardText,
    CardTitle,
    CardBody,
    CardImg,
} from "reactstrap";

function Review({
    firstName,
    lastName,
    profilePic,
    stars,
    comment,
    timestamp,
    productDetail,
}: {
    firstName: string;
    lastName: string;
    profilePic: string;
    stars: number;
    comment: string;
    timestamp: number;
    productDetail: any;
}) {
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h1">Reviews</CardTitle>
                <div className="reviews-top">
                    <div className="user-details">
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                            {JSON.parse(localStorage.getItem('user') ?? 'Jay').name}
                        </CardSubtitle>
                    </div>

                    <div className="reviews-body">
                        <h1>Comments</h1>
                        {productDetail.reviews.length
                            ? productDetail.reviews.map((review: any) => <CardText>{review.reviews}</CardText>)
                            : null}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default Review;