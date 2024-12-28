using ChatApp.Models;
using System.Collections.Concurrent;

namespace ChatApp.DataContext
{
    public class TempDbContext
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connections = new (); 

        public ConcurrentDictionary<string, UserConnection> connections => _connections;
    }
} 
