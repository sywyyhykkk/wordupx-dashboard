/* eslint-disable */
/* prettier-ignore */
// Generated by elegant-router
// Read more: https://github.com/soybeanjs/elegant-router

import type { RouteComponent } from "vue-router";
import type { LastLevelRouteKey, RouteLayout } from "@elegant-router/types";

import BaseLayout from "@/layouts/base-layout/index.vue";
import BlankLayout from "@/layouts/blank-layout/index.vue";

export const layouts: Record<RouteLayout, RouteComponent | (() => Promise<RouteComponent>)> = {
  base: BaseLayout,
  blank: BlankLayout,
};

export const views: Record<LastLevelRouteKey, RouteComponent | (() => Promise<RouteComponent>)> = {
  403: () => import("@/views/_builtin/403/index.vue"),
  404: () => import("@/views/_builtin/404/index.vue"),
  500: () => import("@/views/_builtin/500/index.vue"),
  login: () => import("@/views/_builtin/login/index.vue"),
  decks: () => import("@/views/decks/index.vue"),
  home: () => import("@/views/home/index.vue"),
  user_cards_hidden: () => import("@/views/user_cards/hidden/index.vue"),
  user_cards_learn: () => import("@/views/user_cards/learn/index.vue"),
  user_decks: () => import("@/views/user_decks/index.vue"),
  user_facts: () => import("@/views/user_facts/index.vue"),
  users: () => import("@/views/users/index.vue"),
};
