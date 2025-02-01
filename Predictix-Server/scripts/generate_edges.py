import os
import django
import sys

# Ensure the script runs from the project root directory
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(PROJECT_ROOT)

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "predictix.settings")
django.setup()

from predictixApp.models import Factory, Machine, Edge

def list_unused_machines(factory):
    """
    Lists all machines in the given factory that are **not** used in any edges.
    """
    used_machine_ids = set(
        Edge.objects.filter(factory=factory).values_list("head__machine_id", flat=True)
    ) | set(
        Edge.objects.filter(factory=factory).values_list("source__machine_id", flat=True)
    ) | set(
        Edge.objects.filter(factory=factory).values_list("target__machine_id", flat=True)
    )

    all_machines = factory.machines.all()
    unused_machines = [m for m in all_machines if m.machine_id not in used_machine_ids]

    if not unused_machines:
        print(f"⚠️ No unused machines found in Factory {factory.name} ({factory.id})")
    else:
        print("\n🔹 Available Machines (Not Used in Any Edges):")
        for machine in unused_machines:
            print(f"  - Machine ID: {machine.machine_id}")

def get_machine_by_id(factory, machine_id):
    """
    Retrieves a machine by its `machine_id` within the specified factory.
    """
    try:
        return factory.machines.get(machine_id=machine_id)
    except Machine.DoesNotExist:
        return None

def generate_edges_for_factory(factory_id):
    """
    Allows the user to create edges interactively for a given factory using `machine_id`.
    Allows head and source to be the same machine.
    """
    try:
        # Fetch the factory
        factory = Factory.objects.get(id=factory_id)
        print(f"\n🔹 Selected Factory: {factory.name} ({factory.id})")

        while True:
            try:
                # List machines that haven't been used in any edges
                list_unused_machines(factory)

                print("\n➡ Enter machine IDs for a new edge (or type 'exit' to quit'):")

                # Get Machine IDs from user input
                head_id = input("Enter Head Machine ID: ").strip()
                if head_id.lower() == "exit":
                    print("👋 Exiting edge creation.")
                    break

                source_id = input("Enter Source Machine ID (can be the same as Head): ").strip()
                if source_id.lower() == "exit":
                    print("👋 Exiting edge creation.")
                    break

                target_id = input("Enter Target Machine ID: ").strip()
                if target_id.lower() == "exit":
                    print("👋 Exiting edge creation.")
                    break

                # Convert input to integers
                try:
                    head_id = int(head_id)
                    source_id = int(source_id)
                    target_id = int(target_id)
                except ValueError:
                    print("❌ Invalid input! Machine IDs must be numbers.")
                    continue

                # Fetch Machines within the selected factory using machine_id
                head = get_machine_by_id(factory, head_id)
                source = get_machine_by_id(factory, source_id)
                target = get_machine_by_id(factory, target_id)

                # Ensure machines exist
                if not head or not source or not target:
                    print("❌ One or more machine IDs were not found in this factory. Try again.")
                    continue

                # Ensure Source & Head can be the same, but Target must be unique
                if source == target:
                    print("⚠️ Source and Target must be different! Try again.")
                    continue

                # Check if edge already exists
                if Edge.objects.filter(factory=factory, head=head, source=source, target=target).exists():
                    print("⚠️ Edge already exists! Try a different combination.")
                    continue

                # Create the Edge
                Edge.objects.create(factory=factory, head=head, source=source, target=target)

                print(f"✅ Successfully created Edge: M{head.machine_id:03} -> M{source.machine_id:03} -> M{target.machine_id:03}")

            except ValueError:
                print("❌ Invalid input! Please enter a valid machine ID as a number.")

            except Exception as e:
                print(f"❌ Error: {e}")

    except Factory.DoesNotExist:
        print(f"❌ Factory with ID {factory_id} not found.")

# Run the script
if __name__ == "__main__":
    factory_id = input("Enter Factory ID: ").strip()
    try:
        factory_id = int(factory_id)
        generate_edges_for_factory(factory_id)
    except ValueError:
        print("❌ Invalid Factory ID! Please enter a valid number.")
