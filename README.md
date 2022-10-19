# core-player

The core elements of what a `Player` is, including the `CurrentPlayerRegistry` and `PlayerAction`s.

Includes the `Rule`s:

- `Action` to define which `PlayerAction`s are returned from `Player.actions`.
- `Added` triggered when a `Player` is added.
- `Defeated`      "            "       defeated.
- `TurnEnd` triggered when a `Player`'s turn ends.
- `TurnStart`        "              "        starts.
