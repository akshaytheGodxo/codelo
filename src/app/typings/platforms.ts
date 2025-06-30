import type { NextApiRequest, NextApiResponse } from "next"
import type { Server as IOServer } from "socket.io"
import type { Server as HTTPServer } from "node:http"
import type { Socket as NetSocket } from "node:net"
export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

export interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer
}

export enum WebsocketEventEnum {
  Connected = "connect",
  Matchmaking = "matchmaking",
  MatchFound = "match_found",
  MatchStarted = "match_started",
  MatchEnded = "match_ended",
  EloUpdated = "elo_updated",
  Error = "error",
  Disconnect = "disconnect"
}