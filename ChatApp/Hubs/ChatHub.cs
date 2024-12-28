using ChatApp.DataContext;
using ChatApp.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {
        private readonly TempDbContext _context;

        public ChatHub(TempDbContext context)
        {
            _context = context;
        }
        // this function sends notification after the user has joined a specific chat group
        public async Task JoinChat(UserConnection connection)
        {
            await Clients.All.SendAsync("ReceiveMessage", "admin", $"{connection.UserName} has joined");
        } 
        // this function is the one that actually adds user to a chat group
        public async Task JoinSpecificChatRoom(UserConnection connection)
        {
            //Created a group 
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

            _context.connections[Context.ConnectionId] = connection;


            //Send message to that specific group
            await Clients.Group(connection.ChatRoom).SendAsync("JoinSpecificChatRoom", "admin", $"{connection.UserName} has joined {connection.ChatRoom}");
        }
        public async Task SendMessage(string msg)
        {
            if(_context.connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
            {
                await Clients.Group(conn.ChatRoom)
                    .SendAsync("ReceiveSpecificMessage", conn.UserName, msg);
            }
        }
    }
}
