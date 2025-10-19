# #!/bin/bash

# # Set the Instance ID and path to the .env file
# INSTANCE_ID="i-06bd8527c5401e094"

# # Retrieve the public IP address of the specified EC2 instance
# ipv4_address=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)

# # Path to the .env file
# file_to_find="../frontend/.env.docker"

# # Check the current VITE_API_PATH in the .env file
# current_url=$(cat $file_to_find)

# # Update the .env file if the IP address has changed
# if [[ "$current_url" != "VITE_API_PATH=\"http://${ipv4_address}:31100\"" ]]; then
#     if [ -f $file_to_find ]; then
#         sed -i -e "s|VITE_API_PATH.*|VITE_API_PATH=\"http://${ipv4_address}:31100\"|g" $file_to_find
#     else
#         echo "ERROR: File not found."
#     fi
# fi



#!/bin/bash

INSTANCE_ID="i-06bd8527c5401e094"
file_to_find="../frontend/.env.docker"

# Get public IP
ipv4_address=$(aws ec2 describe-instances --instance-ids "$INSTANCE_ID" --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)
echo "Retrieved IP: $ipv4_address"

# Check if file exists
if [ ! -f "$file_to_find" ]; then
    echo "ERROR: File not found at $file_to_find"
    exit 1
fi

# Get current VITE_API_PATH line
current_url=$(grep 'VITE_API_PATH' "$file_to_find")
echo "Current line: $current_url"

# Update if different
if [[ "$current_url" != *"${ipv4_address}:31100"* ]]; then
    sed -i -e "s|VITE_API_PATH.*|VITE_API_PATH=\"http://${ipv4_address}:31100\"|g" "$file_to_find"
    echo "Updated VITE_API_PATH to http://${ipv4_address}:31100"
else
    echo "VITE_API_PATH is already up-to-date."
fi

