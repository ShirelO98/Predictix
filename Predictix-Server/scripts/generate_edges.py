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

def generate_edges_for_factory(factory_id):
    try:
        # Fetch the factory once
        factory = Factory.objects.get(factory_id=factory_id)
        print(f"\n🔹 Generating edges for Factory: {factory.name} ({factory.factory_id})")

        while True:
            try:
                print("\n➡ Enter machine IDs for a new edge (or type 'exit' to quit):")

                # Get Machine IDs from user input
                head_id = input("Enter Head Machine ID: ").strip()
                if head_id.lower() == "exit":
                    print("👋 Exiting edge creation.")
                    break

                source_id = input("Enter Source Machine ID: ").strip()
                if source_id.lower() == "exit":
                    print("👋 Exiting edge creation.")
                    break

                target_id = input("Enter Target Machine ID: ").strip()
                if target_id.lower() == "exit":
                    print("👋 Exiting edge creation.")
                    break

                # Fetch Machines based on machine_id
                head = Machine.objects.get(machine_id=head_id)
                source = Machine.objects.get(machine_id=source_id)
                target = Machine.objects.get(machine_id=target_id)

                # Ensure all three machines are different
                if head == source or source == target or head == target:
                    print("⚠️ Machines must be different! Please try again.")
                    continue

                # Create the Edge
                edge, created = Edge.objects.get_or_create(
                    factory=factory, head=head, source=source, target=target
                )

                if created:
                    print(f"✅ Successfully created Edge: M{head.machine_id:03} -> M{source.machine_id:03} -> M{target.machine_id:03}")
                else:
                    print("⚠️ Edge already exists!")

            except Machine.DoesNotExist:
                print("❌ One or more Machine IDs were not found. Try again.")

            except Exception as e:
                print(f"❌ Error: {e}")

    except Factory.DoesNotExist:
        print(f"❌ Factory with ID {factory_id} not found.")

# Run the script
if __name__ == "__main__":
    factory_id = input("Enter Factory ID: ").strip()
    generate_edges_for_factory(factory_id)
