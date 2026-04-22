import express from "express";

const app = express();

export const getDashboard = (req, res) => {
  res.status(200).json({
    message: "Dashboard data",
    user: req.user,
  });
};

export const getCommunityPage = (req,res)=>{
    res.status(200).json({
        message: "Community page data",
        user: req.user
    })
}
