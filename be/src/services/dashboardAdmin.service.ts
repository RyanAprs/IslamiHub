import { Request, Response } from "express";
import authModel from "../models/auth.model";
import communityModel from "../models/community.model";
import videoModel from "../models/video.model";

export const getCountData = async (req: Request, res: Response) => {
  try {
    const totalUser = await authModel.countDocuments();
    const totalCommunity = await communityModel.countDocuments();
    const totalVideo = await videoModel.countDocuments();

    const responseData = {
      user: { title: "Total User", total_data: totalUser },
      community: { title: "Total Community", total_data: totalCommunity },
      video: { title: "Total Video", total_data: totalVideo },
    };

    return res.status(200).json({
      status: true,
      status_code: 200,
      message: "Get data successfully",
      data: responseData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
