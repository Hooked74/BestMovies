import React from "react";
import { Redirect } from "react-router";

export default ({ page }) => <Redirect to={`/page/${page || 1}`} />;
