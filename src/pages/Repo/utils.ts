import { RepoItemValueType, TLicense, TUser } from "../../types";
import { Avatar, Layout, Spin, Tag } from "antd";
import React, { useEffect, useMemo, useState } from "react";

export const isLisense = (data: any): data is TLicense =>
  "name" in data && "url" in data;

export const isOwner = (data: any): data is TUser =>
  "avatar_url" in data && "id" in data && "login" in data;
